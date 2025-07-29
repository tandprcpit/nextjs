"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import axios from "axios"
import { ChevronLeft, MapPin, Calendar, Building2, FileText, Users } from "lucide-react"
import Link from "next/link"
import { toast } from "@/components/ui/use-toast"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { SelectionRounds } from "@/components/tpc/SelectionRounds"
import { PlacedStudents } from "@/components/tpc/PlacedStudents"
import { NotWillingStudents } from "@/components/tpc/NotWillingStudents"
import { CompanySkeleton } from "@/components/tpc/CompanySkeleton"

interface PlacementDetails {
  internshipPackage?: number
  fullTimePackage?: number
  positionInternship?: string
  positionFullTime?: string
}

interface Company {
  _id: string
  name: string
  description: string
  profiles: { companyPositionTitle: string; package: number; description: string }[]
  bond: string
  location: string
  criteria: {
    overallCGPA: number
    gender: string[]
    passoutYear: number
    anyLiveKTs: string
    anyGapDuringEducation: string
    department: string[]
    tenthMarks: number
    twelfthPercentage: number
    diplomaPercentage: number
    skills: string[]
  }
  rounds: {
    roundNumber: number
    roundName: string
    selectedStudents: Student[]
  }[]
  placedStudents: {
    student: string
    internshipPackage?: number
    fullTimePackage?: number
    positionInternship?: string
    positionFullTime?: string
  }[]
  willingnessRequests: {
    student: string
    deadline: string
  }[]
  notWillingStudents: {
    student: string
    reason: string
  }[]
}

interface Student {
  _id: string
  firstName: string
  middleName: string
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

export default function SingleCompanyPage() {
  const [company, setCompany] = useState<Company | null>(null)
  const [loading, setLoading] = useState(true)
  const params = useParams<{ id: string }>()

  useEffect(() => {
    async function fetchCompany() {
      try {
        const response = await axios.get(`/api/tpc/get-company/${params.id}`)
        setCompany(response.data.company)
      } catch (error) {
        console.error("Failed to fetch company:", error)
        toast({
          title: "Error",
          description: "Failed to fetch company details. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchCompany()
    }
  }, [params.id])

  const handleDelete = async (roundNumber: number, selectedStudents: string[]) => {
    if (!company) return

    const updatedRounds = company.rounds.map((round) => {
      if (round.roundNumber === roundNumber) {
        return {
          ...round,
          selectedStudents: round.selectedStudents.filter((student) => !selectedStudents.includes(student._id)),
        }
      }
      return round
    })

    setCompany({ ...company, rounds: updatedRounds })
    toast({
      title: "Students Removed",
      description: `Selected students have been removed from Round ${roundNumber}.`,
    })
  }

  const handleSave = async (roundNumber: number, selectedStudents: Student[]) => {
    if (!company) return

    try {
      await axios.patch(`/api/tpc/update-round/${params.id}`, {
        roundNumber,
        selectedStudents: selectedStudents.map((student) => student._id),
      })

      toast({
        title: "Changes Saved",
        description: `Round ${roundNumber} has been updated successfully.`,
      })
    } catch (error) {
      console.error("Failed to save changes:", error)
      toast({
        title: "Error",
        description: "Failed to save changes. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleSearchStudents = async (query: string, passoutYear: number) => {
    try {
      const response = await axios.get(`/api/tpc/search-students`, {
        params: { query, passoutYear },
      })
      return response.data.students
    } catch (error) {
      console.error("Failed to search students:", error)
      toast({
        title: "Error",
        description: "Failed to search students. Please try again.",
        variant: "destructive",
      })
      return []
    }
  }

  const handleUpdateRound = (updatedRound: Company["rounds"][0]) => {
    if (!company) return

    const updatedRounds = company.rounds.map((round) =>
      round.roundNumber === updatedRound.roundNumber ? updatedRound : round,
    )
    setCompany({ ...company, rounds: updatedRounds })
  }

  const handleAddToNextRound = (currentRoundNumber: number, selectedStudents: Student[]) => {
    if (!company) return

    const updatedRounds = company.rounds.map((round) => {
      if (round.roundNumber === currentRoundNumber + 1) {
        return {
          ...round,
          selectedStudents: [...round.selectedStudents, ...selectedStudents],
        }
      }
      return round
    })

    setCompany({ ...company, rounds: updatedRounds })
    toast({
      title: "Students Added to Next Round",
      description: `Selected students have been added to Round ${currentRoundNumber + 1}.`,
    })
  }

  const handleUpdatePlacementStatus = async (studentId: string, placementDetails: PlacementDetails) => {
    if (!company) return

    try {
      await axios.post(`/api/tpc/update-placement-status`, {
        studentId,
        companyId: company._id,
        ...placementDetails,
      })

      const updatedPlacedStudents = [
        ...company.placedStudents.filter((ps) => ps.student !== studentId),
        { student: studentId, ...placementDetails },
      ]

      setCompany({ ...company, placedStudents: updatedPlacedStudents })
      toast({
        title: "Placement Status Updated",
        description: `Student placement status has been updated successfully.`,
      })
    } catch (error) {
      console.error("Failed to update placement status:", error)
      toast({
        title: "Error",
        description: "Failed to update placement status. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleRemovePlacementStatus = async (studentId: string, companyId: string) => {
    if (!company) return

    try {
      await axios.post(`/api/tpc/remove-placement-status`, {
        studentId,
        companyId,
      })

      const updatedPlacedStudents = company.placedStudents.filter((ps) => ps.student !== studentId)
      setCompany({ ...company, placedStudents: updatedPlacedStudents })

      toast({
        title: "Placement Status Removed",
        description: "Student placement status has been removed successfully.",
      })
    } catch (error) {
      console.error("Failed to remove placement status:", error)
      toast({
        title: "Error",
        description: "Failed to remove placement status. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (loading) return <CompanySkeleton />
  if (!company) return <div className="text-center text-2xl text-[#244855]">Company not found</div>

  const maxPackage = Math.max(...(company?.profiles?.map((p) => p.package) || [0]))

  return (
    <div className="container mx-auto p-6 space-y-8">
      <Link
        href="/tpc/companies"
        className="inline-flex items-center text-[#244855] hover:text-[#E64833] transition-colors"
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        Back to Companies
      </Link>

      {/* Company Header */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-[#244855]">{company.name}</h1>
        <div className="flex items-center justify-center gap-4 text-[#874F41]">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{company.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>
              {company.profiles.length} Profile{company.profiles.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Grid - Company Details and Eligibility Side by Side */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Company Details with Profiles */}
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-[#244855] flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              Company Details & Profiles
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Company Information Section */}
            <div>
              <h3 className="text-lg font-semibold text-[#244855] mb-4">Company Information</h3>
              <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#874F41]" />
                  <div>
                    <div className="text-sm text-[#874F41]">Location</div>
                    <div className="font-semibold text-[#244855]">{company.location}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#874F41]" />
                  <div>
                    <div className="text-sm text-[#874F41]">Bond Period</div>
                    <div className="font-semibold text-[#244855]">{company.bond}</div>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Profiles Section */}
            <div>
              <h3 className="text-lg font-semibold text-[#244855] mb-4">Available Profiles</h3>
              <div className="space-y-4">
                {company.profiles.map((profile, index) => (
                  <div key={index} className="border rounded-lg p-4 bg-white shadow-sm">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-semibold text-[#244855] text-lg">{profile.companyPositionTitle}</h4>
                      <Badge variant="secondary" className="bg-[#E64833] text-white text-sm px-3 py-1">
                        ₹{profile.package} LPA
                      </Badge>
                    </div>
                    {profile.description && (
                      <p className="text-sm text-[#874F41] leading-relaxed">{profile.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

           

            {/* Company Description */}
  <div>
  <h3 className="text-lg font-semibold text-[#244855] mb-3 flex items-center gap-2">
    <FileText className="w-4 h-4" />
    Company Description
  </h3>
  {/* Use replace() to strip HTML tags before rendering */}
  <p className="text-[#874F41] whitespace-pre-line">
    {company.description.replace(/<[^>]*>/g, '')}
  </p>
</div>
            {/* Quick Info */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-[#244855]">₹{maxPackage}</div>
                <div className="text-sm text-[#874F41]">Max Package (LPA)</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-[#244855]">{company.profiles.length}</div>
                <div className="text-sm text-[#874F41]">Total Profiles</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Eligibility Criteria */}
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-[#244855] flex items-center gap-2">
              <Users className="w-5 h-5" />
              Eligibility Criteria
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-[#244855]">Overall CGPA</label>
                <div className="text-lg font-semibold text-[#874F41]">{company.criteria.overallCGPA}</div>
              </div>
              <div>
                <label className="text-sm font-medium text-[#244855]">Passout Year</label>
                <div className="text-lg font-semibold text-[#874F41]">{company.criteria.passoutYear}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-[#244855]">10th Marks</label>
                <div className="text-lg font-semibold text-[#874F41]">{company.criteria.tenthMarks}%</div>
              </div>
              <div>
                <label className="text-sm font-medium text-[#244855]">12th Percentage</label>
                <div className="text-lg font-semibold text-[#874F41]">{company.criteria.twelfthPercentage}%</div>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-[#244855]">Eligible Departments</label>
              <div className="flex flex-wrap gap-2 mt-2">
                {company.criteria.department.map((dept, index) => (
                  <Badge key={index} variant="outline" className="text-[#244855] border-[#244855]">
                    {dept}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-[#244855]">Gender Eligibility</label>
              <div className="flex flex-wrap gap-2 mt-2">
                {company.criteria.gender.map((gender, index) => (
                  <Badge key={index} variant="outline" className="text-[#244855] border-[#244855]">
                    {gender}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-[#244855]">Live KTs Allowed</label>
                <div className="text-lg font-semibold text-[#874F41]">{company.criteria.anyLiveKTs}</div>
              </div>
              <div>
                <label className="text-sm font-medium text-[#244855]">Gap Allowed</label>
                <div className="text-lg font-semibold text-[#874F41]">{company.criteria.anyGapDuringEducation}</div>
              </div>
            </div>

            {company.criteria.skills && company.criteria.skills.length > 0 && (
              <div>
                <label className="text-sm font-medium text-[#244855]">Required Skills</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {company.criteria.skills.map((skill, index) => (
                    <Badge key={index} className="bg-[#E64833] text-white">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Selection Rounds */}
      <SelectionRounds
        rounds={company.rounds}
        onDelete={handleDelete}
        onSave={handleSave}
        onSearchStudents={handleSearchStudents}
        passoutYear={company.criteria.passoutYear}
        onUpdateRound={handleUpdateRound}
        onAddToNextRound={handleAddToNextRound}
        onUpdatePlacementStatus={handleUpdatePlacementStatus}
        onRemovePlacementStatus={handleRemovePlacementStatus}
        companyId={company._id}
        companyName={company.name}
        companyLocation={company.location}
        companyPackage={maxPackage}
        companyBond={company.bond}
        placedStudents={company.placedStudents}
      />

      {/* Placed Students */}
      <PlacedStudents
        companyName={company.name}
        companyLocation={company.location}
        companyPackage={maxPackage}
        companyBond={company.bond}
        placedStudents={company.placedStudents.map((ps) => {
          const student = company.rounds.flatMap((r) => r.selectedStudents).find((s) => s._id === ps.student)
          return {
            ...ps,
            _id: ps.student,
            firstName: student?.firstName || "",
            middleName: student?.middleName || "",
            lastName: student?.lastName || "",
            email: student?.email || "",
            department: student?.department || "",
            username: student?.username || "",
            image: student?.image || "/placeholder-user.jpg",
            city: student?.city || "",
          }
        })}
      />

      {/* Not Willing Students */}
      <NotWillingStudents
        companyName={company.name}
        students={(company.notWillingStudents || []).map((nws) => {
          const student = company.rounds.flatMap((r) => r.selectedStudents).find((s) => s._id === nws.student)
          return {
            ...nws,
            _id: nws.student,
            firstName: student?.firstName || "",
            middleName: student?.middleName || "",
            lastName: student?.lastName || "",
            email: student?.email || "",
            department: student?.department || "",
            username: student?.username || "",
          }
        })}
      />
    </div>
  )
}
