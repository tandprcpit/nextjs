import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const genderStats = [
  { gender: "Male", total: 720, placed: 600 },
  { gender: "Female", total: 480, placed: 350 },
]

export default function GenderStats() {
  const totalStudents = genderStats.reduce((acc, curr) => acc + curr.total, 0)
  const totalPlaced = genderStats.reduce((acc, curr) => acc + curr.placed, 0)

  return (
    <div className="space-y-4">
      {genderStats.map((stat) => (
        <Card key={stat.gender}>
          <CardHeader>
            <CardTitle>{stat.gender}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                <p className="text-2xl font-bold">{stat.total}</p>
                <Progress value={(stat.total / totalStudents) * 100} className="mt-2" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Placed Students</p>
                <p className="text-2xl font-bold">{stat.placed}</p>
                <Progress value={(stat.placed / totalPlaced) * 100} className="mt-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

