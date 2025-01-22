'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import OverviewStats from '@/components/analysis/OverviewStats'
import DepartmentStats from '@/components/analysis/DepartmentStats'
import GenderStats from '@/components/analysis/GenderStats'
import PlacementGraphs from '@/components/analysis/PlacementGraphs'
import DetailedStats from '@/components/analysis/DetailedStats'

export default function Dashboard() {
  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold text-[#244855]">TNP Dashboard</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Overview Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <OverviewStats />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Department-wise Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <DepartmentStats />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Gender-wise Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <GenderStats />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Placement Graphs</CardTitle>
        </CardHeader>
        <CardContent>
          <PlacementGraphs />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Detailed Placement Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <DetailedStats />
        </CardContent>
      </Card>
    </div>
  )
}

