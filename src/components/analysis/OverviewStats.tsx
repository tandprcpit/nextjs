import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const stats = [
  { title: "Total Students", value: 1200 },
  { title: "Placed Students", value: 950 },
  { title: "Highest Package", value: "₹45 LPA" },
  { title: "Average Package", value: "₹8.5 LPA" },
]

export default function OverviewStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

