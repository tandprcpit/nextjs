'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import {  MapPin, Banknote, Calendar } from 'lucide-react'

interface Company {
  _id: string
  name: string
  location: string
  salary: number
  createdAt: string
}

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function fetchCompanies() {
      try {
        const response = await axios.get('/api/tpc/get-companies')
        setCompanies(response.data.companies || [])
      } catch (error) {
        console.error('Failed to fetch companies:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCompanies()
  }, [])

  const handleAddCompany = () => {
    router.push('/tpc/companies/add-company')
  }

  const handleCompanyClick = (id: string) => {
    router.push(`/tpc/companies/company/${id}`)
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#244855]">Companies</h1>
        <Button
          onClick={handleAddCompany}
          className="bg-[#E64833] text-white hover:bg-[#244855] transition-colors"
        >
          Add Company
        </Button>
      </div>

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
