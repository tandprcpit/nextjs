'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { MapPin, Banknote, Calendar } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'

interface Company {
  _id: string
  name: string
  location: string
  salary: number
  createdAt: string
}

export default function StudentCompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function fetchCompanies() {
      try {
        const response = await axios.get('/api/student/get-companies')
        if (response.data.success) {
          setCompanies(response.data.companies || [])
        } else {
          toast({
            title: "Error",
            description: response.data.message,
            variant: "destructive",
          })
        }
      } catch (error) {
        console.error('Failed to fetch companies:', error)
        toast({
          title: "Error",
          description: "Failed to fetch companies. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchCompanies()
  }, [])

  const handleCompanyClick = (id: string) => {
    router.push(`/companies/${id}`)
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-[#244855] mb-6">Companies</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="bg-white shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <Skeleton className="h-6 w-3/4" />
                </CardHeader>
                <CardContent className="pb-2">
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </CardContent>
                <CardFooter>
                  <Skeleton className="h-4 w-1/2" />
                </CardFooter>
              </Card>
            ))
          : companies.map((company) => (
              <Card
                key={company._id}
                className="bg-white shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handleCompanyClick(company._id)}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-bold text-[#244855]">{company.name}</CardTitle>
                </CardHeader>
                <CardContent className="pb-2 space-y-2">
                  <div className="flex items-center text-sm text-[#874F41]">
                    <MapPin className="w-4 h-4 mr-2" />
                    {company.location}
                  </div>
                  <div className="flex items-center text-sm text-[#874F41]">
                    <Banknote className="w-4 h-4 mr-2" />
                    ₹{company.salary} LPA
                  </div>
                </CardContent>
                <CardFooter className="text-xs text-gray-500 flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  {new Date(company.createdAt).toLocaleDateString()}
                </CardFooter>
              </Card>
            ))}
      </div>
    </div>
  )
}

