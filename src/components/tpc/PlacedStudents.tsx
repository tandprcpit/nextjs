import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { User, FileDown } from 'lucide-react'
import { useRouter } from "next/navigation"
import { generatePlacedStudentsPDF } from '@/components/tpc/PlacedStudentsPDFGenerator'
import { CSVLink } from "react-csv"

interface PlacedStudent {
    _id: string
    firstName: string
    middleName:string
    lastName: string
    email: string
    department: string
    username: string
    image: string
    city: string
    internshipPackage?: number
    fullTimePackage?: number
    positionInternship?: string
    positionFullTime?: string
}

interface PlacedStudentsProps {
    companyName: string
    companyLocation: string
    companyPackage: number
    companyBond: string
    placedStudents: PlacedStudent[]
}

export function PlacedStudents({ companyName, companyLocation, companyPackage, companyBond, placedStudents }: PlacedStudentsProps) {
    const router = useRouter()

    const handleVisitProfile = (username: string) => {
        router.push(`/other-student-profile/${username}`)
    }

    const handleDownloadPDF = () => {
        generatePlacedStudentsPDF({
            companyName,
            companyLocation,
            placedStudents
        })
    }

    const csvData = [
        ['Company Name', 'Location', 'Package', 'Bond'],
        [companyName, companyLocation, `${companyPackage} LPA`, companyBond],
        ['Name', 'Department', 'PRN Number', 'Full-time Position', 'Package', 'Internship Position', 'Package'],
        ...placedStudents.map(student => [
            `${student.firstName} ${student.middleName} ${student.lastName}`,
            student.department,
            student.username,
            student.positionFullTime || '-',
            student.fullTimePackage ? `${student.fullTimePackage} LPA` : '-',
            student.positionInternship || '-',
            student.internshipPackage ? `${student.internshipPackage} LPA` : '-'
        ])
    ]

    return (
        <Card className="bg-white shadow-lg mt-8">
            <CardHeader className="border-b border-gray-200">
                <CardTitle className="text-2xl font-bold text-[#244855]">Placed Students</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
                <div className="rounded-md border mb-4 overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className='pl-2'>Name</TableHead>
                                <TableHead>Department</TableHead>
                                <TableHead>PRN Number</TableHead>
                                <TableHead>Full-time Position</TableHead>
                                <TableHead>Package</TableHead>
                                <TableHead>Internship Position</TableHead>
                                <TableHead>Package</TableHead>
                                <TableHead>Profile</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {placedStudents.map((student) => (
                                <TableRow key={student._id}>
                                    <TableCell className="font-medium">{student.firstName} {student.middleName} {student.lastName}</TableCell>
                                    <TableCell>{student.department}</TableCell>
                                    <TableCell>{student.username}</TableCell>
                                    <TableCell>{student.positionFullTime || '-'}</TableCell>
                                    <TableCell>{student.fullTimePackage || '-'} LPA</TableCell>
                                    <TableCell>{student.positionInternship || '-'}</TableCell>
                                    <TableCell>{student.internshipPackage || '-'} LPA</TableCell>
                                    
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
                            filename={`${companyName}_Placed_Students.csv`}
                            className="flex items-center"
                        >
                            <FileDown className="mr-2 h-4 w-4" /> Download Placed Students CSV
                        </CSVLink>
                    </Button>
                    <Button
                        variant="outline"
                        onClick={handleDownloadPDF}
                    >
                        <FileDown className="mr-2 h-4 w-4" /> Download Placed Students PDF
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

