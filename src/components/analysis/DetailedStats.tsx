'use client'

import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"

import { CSVLink } from "react-csv"

const detailedStats = [
  { branch: "Computer Science", totalStrength: 300, notWilling: 20, willing: 280, totalOffers: 290, placementPercentage: 96.67, uniqueSelected: 280, uniquePercentage: 93.33, notPlaced: 20 },
  { branch: "AIML", totalStrength: 120, notWilling: 10, willing: 110, totalOffers: 115, placementPercentage: 95.83, uniqueSelected: 110, uniquePercentage: 91.67, notPlaced: 10 },
  { branch: "Electrical", totalStrength: 150, notWilling: 20, willing: 130, totalOffers: 135, placementPercentage: 90.00, uniqueSelected: 130, uniquePercentage: 86.67, notPlaced: 20 },
  { branch: "E&TC", totalStrength: 180, notWilling: 20, willing: 160, totalOffers: 165, placementPercentage: 91.67, uniqueSelected: 160, uniquePercentage: 88.89, notPlaced: 20 },
  { branch: "Data Science", totalStrength: 100, notWilling: 5, willing: 95, totalOffers: 98, placementPercentage: 98.00, uniqueSelected: 95, uniquePercentage: 95.00, notPlaced: 5 },
  { branch: "Mechanical", totalStrength: 200, notWilling:30, willing: 170, totalOffers: 175, placementPercentage: 87.50, uniqueSelected: 170, uniquePercentage: 85.00, notPlaced: 30 },
  { branch: "IT", totalStrength: 250, notWilling: 20, willing: 230, totalOffers: 235, placementPercentage: 94.00, uniqueSelected: 230, uniquePercentage: 92.00, notPlaced: 20 },
  { branch: "AIDS", totalStrength: 80, notWilling: 5, willing: 75, totalOffers: 78, placementPercentage: 97.50, uniqueSelected: 75, uniquePercentage: 93.75, notPlaced: 5 },
]

export default function DetailedStats() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredStats = detailedStats.filter(stat =>
    stat.branch.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <Input
          placeholder="Search by branch..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <CSVLink
          data={detailedStats}
          filename={"detailed_placement_stats.csv"}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
          Download CSV
        </CSVLink>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Branch</TableHead>
              <TableHead>Total Strength</TableHead>
              <TableHead>Not Willing</TableHead>
              <TableHead>Willing</TableHead>
              <TableHead>Total Offers</TableHead>
              <TableHead>Placement %</TableHead>
              <TableHead>Unique Selected</TableHead>
              <TableHead>Unique %</TableHead>
              <TableHead>Not Placed</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStats.map((stat) => (
              <TableRow key={stat.branch}>
                <TableCell>{stat.branch}</TableCell>
                <TableCell>{stat.totalStrength}</TableCell>
                <TableCell>{stat.notWilling}</TableCell>
                <TableCell>{stat.willing}</TableCell>
                <TableCell>{stat.totalOffers}</TableCell>
                <TableCell>{stat.placementPercentage.toFixed(2)}%</TableCell>
                <TableCell>{stat.uniqueSelected}</TableCell>
                <TableCell>{stat.uniquePercentage.toFixed(2)}%</TableCell>
                <TableCell>{stat.notPlaced}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

