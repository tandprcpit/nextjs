import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const departmentStats = [
  { name: "Computer Science", total: 300, placed: 280, highestPackage: 45, averagePackage: 12 },
  { name: "AIML", total: 120, placed: 110, highestPackage: 40, averagePackage: 11 },
  { name: "Electrical", total: 150, placed: 130, highestPackage: 35, averagePackage: 9 },
  { name: "E&TC", total: 180, placed: 160, highestPackage: 38, averagePackage: 10 },
  { name: "Data Science", total: 100, placed: 95, highestPackage: 42, averagePackage: 13 },
  { name: "Mechanical", total: 200, placed: 170, highestPackage: 30, averagePackage: 8 },
  { name: "IT", total: 250, placed: 230, highestPackage: 43, averagePackage: 11.5 },
  { name: "AIDS", total: 80, placed: 75, highestPackage: 39, averagePackage: 10.5 },
]

export default function DepartmentStats() {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Department</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Placed</TableHead>
            <TableHead>Highest Package (LPA)</TableHead>
            <TableHead>Avg. Package (LPA)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {departmentStats.map((dept) => (
            <TableRow key={dept.name}>
              <TableCell>{dept.name}</TableCell>
              <TableCell>{dept.total}</TableCell>
              <TableCell>{dept.placed}</TableCell>
              <TableCell>₹{dept.highestPackage}</TableCell>
              <TableCell>₹{dept.averagePackage}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

