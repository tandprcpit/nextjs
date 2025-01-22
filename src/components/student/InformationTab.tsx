"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"

interface StudentData {
  firstName: string
  middleName: string
  lastName: string
  email: string
  mobileNumber: string
  birthDate: string | Date
  gender: string
  adharNumber: string
  cast: string
  bloodGroup: string
  fatherName: string
  fatherMobileNumber: string
  fatherOccupation: string
  motherName: string
  motherMobileNumber: string
  motherOccupation: string
  city: string
  district: string
  state: string
  pincode: string
  localAddress: string
  prnNumber: string
  department: string
  division: string
  passoutYear: number
  lgName: string
  tenthMarks: string
  twelfthDiploma: string
  twelfthDiplomaPercentage: string
  admissionBasedOn: string
  sem1SGPA: number
  sem1CGPA: number
  sem1Backlog: number
  sem2SGPA: number
  sem2CGPA: number
  sem2Backlog: number
  sem3SGPA: number
  sem3CGPA: number
  sem3Backlog: number
  sem4SGPA: number
  sem4CGPA: number
  sem4Backlog: number
  sem5SGPA: number
  sem5CGPA: number
  sem5Backlog: number
  sem6SGPA: number
  sem6CGPA: number
  sem6Backlog: number
  overallCGPA: number
  anyLiveKTs: number
  anyGapDuringEducation: string
  gapReason?: string
}

interface StudentProfileProps {
  studentData: StudentData | null
  loading: boolean
}

export default function InformationTab({ studentData }: StudentProfileProps) {
  const [activeTab, setActiveTab] = useState("personal")

  if (!studentData) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  return (
    <Card className="w-full max-w-4xl mx-auto mt-8">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-center">Student Information</CardTitle>
        <CardDescription className="text-center">View personal and academic details</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="personal">Personal Information</TabsTrigger>
            <TabsTrigger value="academic">Academic Information</TabsTrigger>
          </TabsList>
          <TabsContent value="personal">
            <ScrollArea className="h-[600px] w-full rounded-md border p-4">
              <Table>
                <TableBody>
                  <TableRow>
                    <TableHead className="font-medium">Full Name</TableHead>
                    <TableCell>{`${studentData.firstName} ${studentData.middleName} ${studentData.lastName}`}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead className="font-medium">Email</TableHead>
                    <TableCell>{studentData.email}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead className="font-medium">Mobile Number</TableHead>
                    <TableCell>{studentData.mobileNumber}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead className="font-medium">Birth Date</TableHead>
                    <TableCell>{new Date(studentData.birthDate).toLocaleDateString()}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead className="font-medium">Gender</TableHead>
                    <TableCell>{studentData.gender}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead className="font-medium">Aadhar Number</TableHead>
                    <TableCell>{studentData.adharNumber}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead className="font-medium">Cast</TableHead>
                    <TableCell>{studentData.cast}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead className="font-medium">Blood Group</TableHead>
                    <TableCell>{studentData.bloodGroup}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead className="font-medium">Father&apos;s Name</TableHead>
                    <TableCell>{studentData.fatherName}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead className="font-medium">Father&apos;s Mobile</TableHead>
                    <TableCell>{studentData.fatherMobileNumber}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead className="font-medium">Father&apos;s Occupation</TableHead>
                    <TableCell>{studentData.fatherOccupation}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead className="font-medium">Mother&apos;s Name</TableHead>
                    <TableCell>{studentData.motherName}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead className="font-medium">Mother&apos;s Mobile</TableHead>
                    <TableCell>{studentData.motherMobileNumber}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead className="font-medium">Mother&apos;s Occupation</TableHead>
                    <TableCell>{studentData.motherOccupation}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead className="font-medium">City</TableHead>
                    <TableCell>{studentData.city}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead className="font-medium">District</TableHead>
                    <TableCell>{studentData.district}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead className="font-medium">State</TableHead>
                    <TableCell>{studentData.state}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead className="font-medium">Pincode</TableHead>
                    <TableCell>{studentData.pincode}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead className="font-medium">Local Address</TableHead>
                    <TableCell>{studentData.localAddress}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="academic">
            <ScrollArea className="h-[600px] w-full rounded-md border p-4">
              <Table>
                <TableBody>
                  <TableRow>
                    <TableHead className="font-medium">PRN Number</TableHead>
                    <TableCell>{studentData.prnNumber}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead className="font-medium">Department</TableHead>
                    <TableCell>{studentData.department}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead className="font-medium">Division</TableHead>
                    <TableCell>{studentData.division}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead className="font-medium">Passout Year</TableHead>
                    <TableCell>{studentData.passoutYear}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead className="font-medium">LG Name</TableHead>
                    <TableCell>{studentData.lgName}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead className="font-medium">10th Percentage</TableHead>
                    <TableCell>{studentData.tenthMarks}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead className="font-medium">12th/Diploma</TableHead>
                    <TableCell>{studentData.twelfthDiploma}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead className="font-medium">{studentData.twelfthDiploma} Percentage</TableHead>
                    <TableCell>{studentData.twelfthDiplomaPercentage}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead className="font-medium">Admission Based On</TableHead>
                    <TableCell>{studentData.admissionBasedOn}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <Table className="mt-4">
                <TableHeader>
                  <TableRow>
                    <TableHead>Semester</TableHead>
                    <TableHead>SGPA</TableHead>
                    <TableHead>CGPA</TableHead>
                    <TableHead>Backlog</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Semester 1</TableCell>
                    <TableCell>{studentData.sem1SGPA ?? 'N/A'}</TableCell>
                    <TableCell>{studentData.sem1CGPA ?? 'N/A'}</TableCell>
                    <TableCell>{studentData.sem1Backlog ?? 'N/A'}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Semester 2</TableCell>
                    <TableCell>{studentData.sem2SGPA ?? 'N/A'}</TableCell>
                    <TableCell>{studentData.sem2CGPA ?? 'N/A'}</TableCell>
                    <TableCell>{studentData.sem2Backlog ?? 'N/A'}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Semester 3</TableCell>
                    <TableCell>{studentData.sem3SGPA ?? 'N/A'}</TableCell>
                    <TableCell>{studentData.sem3CGPA ?? 'N/A'}</TableCell>
                    <TableCell>{studentData.sem3Backlog ?? 'N/A'}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Semester 4</TableCell>
                    <TableCell>{studentData.sem4SGPA ?? 'N/A'}</TableCell>
                    <TableCell>{studentData.sem4CGPA ?? 'N/A'}</TableCell>
                    <TableCell>{studentData.sem4Backlog ?? 'N/A'}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Semester 5</TableCell>
                    <TableCell>{studentData.sem5SGPA ?? 'N/A'}</TableCell>
                    <TableCell>{studentData.sem5CGPA ?? 'N/A'}</TableCell>
                    <TableCell>{studentData.sem5Backlog ?? 'N/A'}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Semester 6</TableCell>
                    <TableCell>{studentData.sem6SGPA ?? 'N/A'}</TableCell>
                    <TableCell>{studentData.sem6CGPA ?? 'N/A'}</TableCell>
                    <TableCell>{studentData.sem6Backlog ?? 'N/A'}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <Table className="mt-4">
                <TableBody>
                  <TableRow>
                    <TableHead className="font-medium">Overall CGPA</TableHead>
                    <TableCell>{studentData.overallCGPA}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead className="font-medium">Live KT&apos;s</TableHead>
                    <TableCell>{studentData.anyLiveKTs}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead className="font-medium">Any gap during education</TableHead>
                    <TableCell>{studentData.anyGapDuringEducation}</TableCell>
                  </TableRow>
                  {studentData.anyGapDuringEducation === "Yes" && (
                    <TableRow>
                      <TableHead className="font-medium">Gap Reason</TableHead>
                      <TableCell>{studentData.gapReason}</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

