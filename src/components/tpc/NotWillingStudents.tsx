import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { User, FileDown } from 'lucide-react'
import { useRouter } from "next/navigation"
import { generateNotWillingStudentsPDF } from '@/components/tpc/NotWillingStudentsPDFGenerator'
import { CSVLink } from "react-csv"

interface NotWillingStudent {
  _id: string
  firstName: string
  middleName:string
  lastName: string
  email: string
  department: string
  username: string
  reason: string
}

interface NotWillingStudentsProps {
  companyName: string
  students: NotWillingStudent[]
}

export function NotWillingStudents({ companyName, students }: NotWillingStudentsProps) {
  const router = useRouter()

  const handleVisitProfile = (username: string) => {
    router.push(`/other-student-profile/${username}`)
  }

  const handleDownloadPDF = () => {
    generateNotWillingStudentsPDF({
      companyName,
      students
    })
  }

  const csvData = [
    ['Company Name', companyName],
    ['Name', 'Department', 'PRN Number', 'Reason'],
    ...students.map(student => [
      `${student.firstName} ${student.lastName}`,
      student.department,
      student.username,
      student.reason
    ])
  ]

  return (
    <Card className="bg-white shadow-lg mt-8">
      <CardHeader className="border-b border-gray-200">
        <CardTitle className="text-2xl font-bold text-[#244855]">Not Willing Students</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="rounded-md border mb-4 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-2">Name</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>PRN Number</TableHead>
                <TableHead className="w-1/2">Reason</TableHead>
                <TableHead>Profile</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student._id}>
                  <TableCell className="font-medium">{student.firstName} {student.middleName} {student.lastName}</TableCell>
                  <TableCell>{student.department}</TableCell>
                  <TableCell>{student.username}</TableCell>
                  <TableCell className="w-1/2">{student.reason}</TableCell>
                  <TableCell>
                    <User
                      className="h-5 w-5 text-[#244855] hover:text-[#E64833] cursor-pointer"
                      onClick={() => handleVisitProfile(student.username)}
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
              data={csvData}
              filename={`${companyName}_Not_Willing_Students.csv`}
              className="flex items-center"
            >
              <FileDown className="mr-2 h-4 w-4" /> Download Not Willing Students CSV
            </CSVLink>
          </Button>
          <Button
            variant="outline"
            onClick={handleDownloadPDF}
          >
            <FileDown className="mr-2 h-4 w-4" /> Download Not Willing Students PDF
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

