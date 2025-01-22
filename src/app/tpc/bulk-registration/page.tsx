'use client'

import { useState } from 'react'
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Loader2, Upload } from 'lucide-react'
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import axios, { AxiosError } from 'axios'
import { ApiResponse } from "@/types/apiResponse"

interface StudentData {
  prn: string
  email: string
  department: string
}

interface RegistrationResult {
  prn: string
  status: 'success' | 'failed' | 'skipped'
  message?: string
}

const DEPARTMENTS = [
  "Computer",
  "Data Science",
  "AIML",
  "E&TC",
  "Mechanical",
  "Electrical",
  "AIDS",
  "IT",
  "Civil"
]

export default function BulkRegistrationPage() {
  const [file, setFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [results, setResults] = useState<RegistrationResult[]>([])
  const { toast } = useToast()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return

    setIsSubmitting(true)
    setResults([])
    const reader = new FileReader()

    reader.onload = async (event) => {
      try {
        const csvData = event.target?.result as string
        const rows = csvData.split('\n').filter(row => row.trim())
        const students: StudentData[] = []

        // Skip header row and process data
        for (let i = 1; i < rows.length; i++) {
          const [prn, email, department] = rows[i].split(',').map(cell => cell.trim())
          if (prn && email && department && DEPARTMENTS.includes(department)) {
            students.push({ prn, email, department })
          }
        }

        const response = await axios.post<ApiResponse & { results: RegistrationResult[] }>('/api/tpc/bulk-registration', {
          students
        })

        setResults(response.data.results)
        toast({
          title: 'Success',
          description: response.data.message
        })
      } catch (error) {
        console.error('Error in bulk registration:', error)
        const axiosError = error as AxiosError<ApiResponse>
        toast({
          title: 'Error',
          description: axiosError.response?.data.message || 'Something went wrong',
          variant: 'destructive'
        })
      } finally {
        setIsSubmitting(false)
      }
    }

    reader.readAsText(file)
  }

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Bulk Student Registration</CardTitle>
          <CardDescription>
            Upload a CSV file containing student information to create multiple accounts at once.
            The CSV should have the following columns: PRN,email,department
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="csv">CSV File</Label>
              <Input
                id="csv"
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                disabled={isSubmitting}
              />
            </div>
            <Button 
              type="submit" 
              disabled={!file || isSubmitting}
              className="w-full sm:w-auto"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload and Create Accounts
                </>
              )}
            </Button>
          </form>
          {results.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Registration Results</h3>
              <div className="space-y-2">
                {results.map((result, index) => (
                  <div key={index} className={`p-2 rounded ${
                    result.status === 'success' ? 'bg-green-100' :
                    result.status === 'failed' ? 'bg-red-100' : 'bg-yellow-100'
                  }`}>
                    <span className="font-medium">{result.prn}</span>: {result.status}
                    {result.message && <span className="ml-2">- {result.message}</span>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
