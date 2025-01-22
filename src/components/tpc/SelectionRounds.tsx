import { useState, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { debounce } from 'lodash'
import { useRouter } from "next/navigation"
import { User, FileDown } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { generatePDF } from '@/components/tpc/PDFGenrator'
import { CSVLink } from "react-csv"
import axios from 'axios'
import { toast } from "@/components/ui/use-toast"

interface PlacementDetails {
  internshipPackage?: number;
  fullTimePackage?: number;
  positionInternship?: string;
  positionFullTime?: string;
}

interface Student {
  _id: string
  firstName: string
  middleName:string
  lastName: string
  email: string
  department: string
  username: string
  image: string
  city: string
  twelfthDiploma: string
  overallCGPA: number
  tenthMarks: number
  twelfthDiplomaPercentage: number
}

interface Round {
  roundNumber: number
  roundName: string
  selectedStudents: Student[]
}

interface SelectionRoundsProps {
  rounds: Round[]
  onDelete: (roundNumber: number, selectedStudents: string[]) => void
  onSave: (roundNumber: number, selectedStudents: Student[]) => void
  onSearchStudents: (query: string, passoutYear: number) => Promise<SearchResult[]>
  passoutYear: number
  onUpdateRound: (updatedRound: Round) => void
  onAddToNextRound: (currentRoundNumber: number, selectedStudents: Student[]) => void
  onUpdatePlacementStatus: (studentId: string, placementDetails: PlacementDetails) => Promise<void>
  onRemovePlacementStatus: (studentId: string, companyId: string) => Promise<void>
  companyId: string
  companyName: string
  companyLocation: string
  companyPackage: number
  companyBond: string
  placedStudents?: { student: string }[];
}

interface SearchResult {
  _id: string
  firstName: string
  lastName: string
  department: string
  username: string
}

export function SelectionRounds({
  rounds,
  onDelete,
  onSave,
  onSearchStudents,
  passoutYear,
  onUpdateRound,
  onAddToNextRound,
  onUpdatePlacementStatus,
  onRemovePlacementStatus,
  companyId,
  companyName,
  companyLocation,
  companyPackage,
  companyBond,
  placedStudents = []
}: SelectionRoundsProps) {
  const [selectedStudents, setSelectedStudents] = useState<{ [key: number]: Set<string> }>({})
  console.log("selectedStudents",selectedStudents)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [placementDialogOpen, setPlacementDialogOpen] = useState(false)
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null)
  const [placementDetails, setPlacementDetails] = useState<PlacementDetails>({
    internshipPackage: 0,
    fullTimePackage: 0,
    positionInternship: '',
    positionFullTime: '',
  })
  const [removalDialogOpen, setRemovalDialogOpen] = useState(false)
  const [studentToRemove, setStudentToRemove] = useState<Student | null>(null)
  const [willingnessDialogOpen, setWillingnessDialogOpen] = useState(false)
  const [willingnessDeadline, setWillingnessDeadline] = useState<Date | undefined>(undefined)

  const handleCheckboxChange = (roundNumber: number, studentId: string) => {
    setSelectedStudents((prev) => {
      const newSelected = { ...prev };
      if (!newSelected[roundNumber]) {
        newSelected[roundNumber] = new Set();
      } else {
        newSelected[roundNumber] = new Set(newSelected[roundNumber]);
      }

      if (newSelected[roundNumber].has(studentId)) {
        newSelected[roundNumber].delete(studentId);
      } else {
        newSelected[roundNumber].add(studentId);
      }
      return newSelected;
    });
  };

  const handleSelectAll = (roundNumber: number, checked: boolean) => {
    setSelectedStudents((prev) => {
      const newSelected = { ...prev };
      if (checked) {
        newSelected[roundNumber] = new Set(
          rounds.find((r) => r.roundNumber === roundNumber)?.selectedStudents.map((s) => s._id) || []
        );
      } else {
        newSelected[roundNumber] = new Set();
      }
      return newSelected;
    });
  };

  const debouncedSearch = useCallback(
    debounce(async (query: string) => {
      if (query.length > 2) {
        const results = await onSearchStudents(query, passoutYear)
        setSearchResults(results)
      } else {
        setSearchResults([])
      }
    }, 300),
    [onSearchStudents, passoutYear]
  )

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    debouncedSearch(query)
  }

  const handleAddStudent = (roundNumber: number, student: SearchResult) => {
    const round = rounds.find(r => r.roundNumber === roundNumber)
    if (round && !round.selectedStudents.some(s => s._id === student._id)) {
      const updatedRound = {
        ...round,
        selectedStudents: [...round.selectedStudents, student as Student]
      }
      onUpdateRound(updatedRound)
    }
  }

  const handleAddToNextRound = (currentRound: Round) => {
    const selectedStudentIds = selectedStudents[currentRound.roundNumber] || new Set();
    const studentsToMove = currentRound.selectedStudents.filter(student => {
      return !rounds.some(round =>
        round.roundNumber === currentRound.roundNumber + 1 && round.selectedStudents.some(s => s._id === student._id)
      ) && selectedStudentIds.has(student._id);
    });

    if (studentsToMove.length > 0) {
      onAddToNextRound(currentRound.roundNumber, studentsToMove);
      setSelectedStudents(prev => ({ ...prev, [currentRound.roundNumber]: new Set() }));
    }
  };

  const handlePlacementToggle = async (student: Student) => {
    const isPlaced = isStudentPlaced(student._id);
    if (isPlaced) {
      setStudentToRemove(student);
      setRemovalDialogOpen(true);
    } else {
      setCurrentStudent(student);
      setPlacementDetails({
        internshipPackage: 0,
        fullTimePackage: 0,
        positionInternship: '',
        positionFullTime: '',
      });
      setPlacementDialogOpen(true);
    }
  };

  const handleConfirmPlacement = async () => {
    if (currentStudent) {
      await onUpdatePlacementStatus(currentStudent._id, placementDetails);
      setPlacementDialogOpen(false);
    }
  };

  const handleConfirmRemoval = async () => {
    if (studentToRemove) {
      await onRemovePlacementStatus(studentToRemove._id, companyId);
      setRemovalDialogOpen(false);
      setStudentToRemove(null);
    }
  };

  const handleDownloadPDF = (currentRound: Round) => {
    generatePDF({
      name: companyName,
      location: companyLocation,
      salary: companyPackage,
      bond: companyBond,
      currentRound
    })
  }

  const router = useRouter();

  const handleVisitProfile = (username: string) => {
    router.push(`/other-student-profile/${username}`);
  };

  const isStudentPlaced = (studentId: string) => {
    return placedStudents?.some(ps => ps.student === studentId) || false;
  };

  const generateCSVData = (round: Round) => {
    return [
      ['Company Name', 'Location', 'Package', 'Bond'],
      [companyName, companyLocation, `${companyPackage} LPA`, companyBond],
      ['Round', round.roundNumber.toString(), 'Round Name', round.roundName],
      ['Name', 'Email', 'Department', 'PRN Number', 'CGPA', '10th', '12th/Diploma', '12th/Diploma %'],
      ...round.selectedStudents.map(student => [
        `${student.firstName} ${student.middleName} ${student.lastName}`,
        student.email,
        student.department,
        student.username,
        student.overallCGPA,
        student.tenthMarks,
        student.twelfthDiploma,
        student.twelfthDiplomaPercentage
      ])
    ]
  }

  const handleSendWillingness = async () => {
    if (!willingnessDeadline) return;

    const firstRound = rounds.find(round => round.roundNumber === 1);
    if (!firstRound) {
      toast({
        title: "Error",
        description: "First round not found.",
        variant: "destructive",
      });
      return;
    }

    const selectedStudentIds = Array.from(selectedStudents[1] || new Set());

    try {
      await axios.post(`/api/tpc/send-willingness/${companyId}`, {
        studentIds: selectedStudentIds,
        deadline: willingnessDeadline,
      });

      toast({
        title: "Willingness Request Sent",
        description: `Willingness request sent to ${selectedStudentIds.length} students.`,
      });

      setWillingnessDialogOpen(false);
      setWillingnessDeadline(undefined);
    } catch (error) {
      console.error('Failed to send willingness request:', error);
      toast({
        title: "Error",
        description: "Failed to send willingness request. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="bg-white shadow-lg">
      <CardHeader className="border-b border-gray-200">
        <CardTitle className="text-2xl font-bold text-[#244855]">Selection Rounds</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <Tabs defaultValue={rounds[0]?.roundNumber.toString()}>
          <TabsList className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 mb-6">
            {rounds.map((round) => (
              <TabsTrigger
                key={round.roundNumber}
                value={round.roundNumber.toString()}
                className="data-[state=active]:bg-[#244855] data-[state=active]:text-white"
              >
                Round {round.roundNumber}
              </TabsTrigger>
            ))}
          </TabsList>
          {rounds.map((round) => (
            <TabsContent key={round.roundNumber} value={round.roundNumber.toString()}>
              <h3 className="mt-20 text-xl font-semibold text-[#244855] mb-4">{round.roundName}</h3>
              <div className="mb-4">
                <Input
                  type="text"
                  placeholder="Search students..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                {searchResults.length > 0 && (
                  <div className="mt-2 border rounded-md p-2">
                    {searchResults.map(student => (
                      <div key={student._id} className="flex justify-between items-center py-2">
                        <div>
                          <span className="font-medium">{student.firstName} {student.lastName}</span>
                          <span className="text-sm text-gray-500 ml-2">({student.department})</span>
                          <span className="text-sm text-gray-500 ml-2">PRN: {student.username}</span>
                        </div>
                        <Button
                          onClick={() => handleAddStudent(round.roundNumber, student)}
                          disabled={round.selectedStudents.some(s => s._id === student._id)}
                        >
                          {round.selectedStudents.some(s => s._id === student._id) ? 'Added' : 'Add'}
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="rounded-md border mb-4 overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">
                        <Checkbox
                          className="ml-2"
                          checked={
                            selectedStudents[round.roundNumber]?.size === round.selectedStudents.length &&
                            round.selectedStudents.length > 0
                          }
                          onCheckedChange={(checked) => handleSelectAll(round.roundNumber, checked as boolean)}
                        />
                      </TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>PRN Number</TableHead>
                      <TableHead>CGPA</TableHead>
                      <TableHead>10th%</TableHead>
                      <TableHead>12th/Diploma</TableHead>
                      <TableHead className='pl-2'>%</TableHead>
                      <TableHead>Profile</TableHead>
                      <TableHead>Placed</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {round.selectedStudents.map((student) => (
                      <TableRow key={student._id}>
                        <TableCell>
                          <Checkbox
                            checked={selectedStudents[round.roundNumber]?.has(student._id)}
                            onCheckedChange={() => handleCheckboxChange(round.roundNumber, student._id)}
                          />
                        </TableCell>
                        <TableCell className="font-medium">{student.firstName} {student.middleName} {student.lastName}</TableCell>
                        <TableCell>{student.email}</TableCell>
                        <TableCell>{student.department}</TableCell>
                        <TableCell>{student.username}</TableCell>
                        <TableCell>{student.overallCGPA}</TableCell>
                        <TableCell>{student.tenthMarks}</TableCell>
                        <TableCell>{student.twelfthDiploma}</TableCell>
                        <TableCell>{student.twelfthDiplomaPercentage}</TableCell>
                        <TableCell>
                          <User
                            className="h-5 w-5 text-[#244855] hover:text-[#E64833] cursor-pointer"
                            onClick={() => handleVisitProfile(student.username)}
                          />
                        </TableCell>
                        <TableCell>
                          <Switch
                            checked={isStudentPlaced(student._id)}
                            onCheckedChange={() => handlePlacementToggle(student)}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="flex justify-end space-x-4">
                <Button variant="outline">
                  <CSVLink
                    data={generateCSVData(round)}
                    filename={`${companyName}_Round_${round.roundNumber}_${round.roundName}.csv`}
                    className="flex items-center"
                  >
                    <FileDown className="mr-2 h-4 w-4" /> Download CSV
                  </CSVLink>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleDownloadPDF(round)}
                >
                  <FileDown className="mr-2 h-4 w-4" /> Download PDF
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    const updatedStudents = round.selectedStudents.filter(
                      student => !selectedStudents[round.roundNumber]?.has(student._id)
                    )
                    onUpdateRound({ ...round, selectedStudents: updatedStudents })
                    setSelectedStudents(prev => ({ ...prev, [round.roundNumber]: new Set() }))
                  }}
                  disabled={!selectedStudents[round.roundNumber] || selectedStudents[round.roundNumber].size === 0}
                >
                  Delete Selected
                </Button>
                <Button
                  variant="default"
                  onClick={() => onSave(round.roundNumber, round.selectedStudents)}
                >
                  Save Changes
                </Button>
                {round.roundNumber < rounds.length && (
                  <Button
                    variant="outline"
                    onClick={() => handleAddToNextRound(round)}
                    disabled={!selectedStudents[round.roundNumber] || selectedStudents[round.roundNumber].size === 0}
                  >
                    Add to Next Round
                  </Button>
                )}
                {round.roundNumber === 1 && (
                  <Button
                    variant="outline"
                    onClick={() => setWillingnessDialogOpen(true)}
                    disabled={!selectedStudents[round.roundNumber] || selectedStudents[round.roundNumber].size === 0}
                  >
                    Send Willingness
                  </Button>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
      <Dialog open={placementDialogOpen} onOpenChange={setPlacementDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Placement Status</DialogTitle>
            <DialogDescription>
              Please enter the placement details for this student.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="positionInternship" className="text-right">
                Internship Position
              </Label>
              <Input
                id="positionInternship"
                value={placementDetails.positionInternship}
                onChange={(e) => setPlacementDetails({ ...placementDetails, positionInternship: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="positionFullTime" className="text-right">
                Full-time Position
              </Label>
              <Input
                id="positionFullTime"
                value={placementDetails.positionFullTime}
                onChange={(e) => setPlacementDetails({ ...placementDetails, positionFullTime: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="internshipPackage" className="text-right">
                Internship Package (LPA)
              </Label>
              <Input
                id="internshipPackage"
                type="number"
                value={placementDetails.internshipPackage}
                onChange={(e) => setPlacementDetails({ ...placementDetails, internshipPackage: Number(e.target.value) })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="fullTimePackage" className="text-right">
                Full-time Package (LPA)
              </Label>
              <Input
                id="fullTimePackage"
                type="number"
                value={placementDetails.fullTimePackage}
                onChange={(e) => setPlacementDetails({ ...placementDetails, fullTimePackage: Number(e.target.value) })}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPlacementDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirmPlacement}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={removalDialogOpen} onOpenChange={setRemovalDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Placement Removal</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove the placement status for {studentToRemove?.firstName} {studentToRemove?.lastName}?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRemovalDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmRemoval}>
              Remove Placement
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={willingnessDialogOpen} onOpenChange={setWillingnessDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Willingness Request</DialogTitle>
            <DialogDescription>
              Set a deadline for students to respond to the willingness request.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="deadline" className="text-right">
                Deadline
              </Label>
              <div className="col-span-3">
                <Calendar
                  mode="single"
                  selected={willingnessDeadline}
                  onSelect={setWillingnessDeadline}
                  className="rounded-md border"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setWillingnessDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSendWillingness} disabled={!willingnessDeadline}>
              Send Willingness Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

