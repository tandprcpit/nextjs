'use client'

import { useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bar, Line } from 'react-chartjs-2'
import type { ChartData, ChartOptions } from 'chart.js'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from 'chart.js'
import { Download } from 'lucide-react'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
)

const departments = ['Computer', 'AIML', 'Electrical', 'E&TC', 'Data Science', 'Mechanical', 'IT', 'AIDS']
const years = ['2019', '2020', '2021', '2022', '2023']

const placedStudentsByDept: ChartData<'bar'> = {
  labels: departments,
  datasets: [
    {
      label: 'Placed Students',
      data: [280, 110, 130, 160, 95, 170, 230, 75],
      backgroundColor: '#244855',
    },
  ],
}

const yearlyPlacementByDept: ChartData<'line'> = {
  labels: years,
  datasets: departments.map((dept, index) => ({
    label: dept,
    data: Array(5).fill(0).map(() => Math.floor(Math.random() * 100)),
    borderColor: `hsl(${index * 45}, 70%, 50%)`,
    backgroundColor: `hsl(${index * 45}, 70%, 50%, 0.5)`,
  })),
}

const campusSelectionPercentage: ChartData<'line'> = {
  labels: years,
  datasets: [
    {
      label: 'Campus Selection Percentage',
      data: [75, 78, 82, 85, 88],
      borderColor: '#E64833',
      backgroundColor: 'rgba(230, 72, 51, 0.5)',
    },
  ],
}

const companiesVisited: ChartData<'line'> = {
  labels: years,
  datasets: [
    {
      label: 'Number of Companies Visited',
      data: [50, 55, 60, 65, 70],
      borderColor: '#90AEAD',
      backgroundColor: 'rgba(144, 174, 173, 0.5)',
    },
  ],
}

const chartOptions: ChartOptions<'bar' | 'line'> = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'R. C. Patel Institute Of Technology, Shirpur',
    },
  },
}

function DownloadButton({ chartRef, fileName }: { chartRef: React.RefObject<ChartJS>, fileName: string }) {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.download = `${fileName}.png`;
    link.href = chartRef.current?.toBase64Image() || '';
    link.click();
  };

  return (
    <Button onClick={handleDownload} className="mt-2">
      <Download className="mr-2 h-4 w-4" /> Download Graph
    </Button>
  );
}

export default function PlacementGraphs() {
  const barChartRef = useRef<ChartJS<"bar", number[], unknown>>(null);
  const lineChartRefs = {
    yearlyPlacement: useRef<ChartJS<"line", number[], unknown>>(null),
    campusSelection: useRef<ChartJS<"line", number[], unknown>>(null),
    companiesVisited: useRef<ChartJS<"line", number[], unknown>>(null),
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Placed Students by Department</CardTitle>
        </CardHeader>
        <CardContent>
          <Bar ref={barChartRef} data={placedStudentsByDept} options={chartOptions} />
          <DownloadButton chartRef={barChartRef} fileName="placed-students-by-department" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Yearly Placement by Department</CardTitle>
        </CardHeader>
        <CardContent>
          <Line ref={lineChartRefs.yearlyPlacement} data={yearlyPlacementByDept} options={chartOptions} />
          <DownloadButton chartRef={lineChartRefs.yearlyPlacement} fileName="yearly-placement-by-department" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Campus Selection Percentage vs Year</CardTitle>
        </CardHeader>
        <CardContent>
          <Line ref={lineChartRefs.campusSelection} data={campusSelectionPercentage} options={chartOptions} />
          <DownloadButton chartRef={lineChartRefs.campusSelection} fileName="campus-selection-percentage" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Number of Companies Visited vs Year</CardTitle>
        </CardHeader>
        <CardContent>
          <Line ref={lineChartRefs.companiesVisited} data={companiesVisited} options={chartOptions} />
          <DownloadButton chartRef={lineChartRefs.companiesVisited} fileName="companies-visited" />
        </CardContent>
      </Card>
    </div>
  )
}

