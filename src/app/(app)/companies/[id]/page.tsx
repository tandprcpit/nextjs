'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios'
import { CompanyDetails } from '@/components/tpc/CompanyDetails'
import { EligibilityCriteria } from '@/components/tpc/EligibilityCriteria'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { CompanySkeleton } from '@/components/tpc/CompanySkeleton'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

interface Company {
  _id: string
  name: string
  description: string
  location: string
  salary: number
  bond: string
  criteria: any
  rounds: {
    roundNumber: number
    roundName: string
    selectedStudents: string[]
  }[]
  willingnessRequests: {
    students: string[]
    deadline: string
  }
  notWillingStudents: {
    student: string
    reason: string
  }[]
}

export default function StudentCompanyPage() {
  const [company, setCompany] = useState<Company | null>(null)
  const [loading, setLoading] = useState(true)
  const [studentStatus, setStudentStatus] = useState<string>('')
  const [roundName, setRoundName] = useState<string>('')
  const [isEligible, setIsEligible] = useState<boolean>(false)
  const [reason, setReason] = useState('')
  const [showNotWillingDialog, setShowNotWillingDialog] = useState(false)
  const [showWillingDialog, setShowWillingDialog] = useState(false)
  const params = useParams<{ id: string }>()

  useEffect(() => {
    async function fetchCompany() {
      try {
        const response = await axios.get(`/api/student/get-company/${params.id}`)
        if (response.data.success) {
          setCompany(response.data.company)
          setStudentStatus(response.data.studentStatus)
          setRoundName(response.data.roundName)
          setIsEligible(response.data.isEligible)
        } else {
          toast({
            title: "Error",
            description: response.data.message,
            variant: "destructive",
          })
        }
      } catch (error) {
        console.error('Failed to fetch company:', error)
        toast({
          title: "Error",
          description: "Failed to fetch company details. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchCompany()
    }
  }, [params.id])

  const handleWillingToApply = async () => {
    try {
      const response = await axios.post(`/api/student/willing-to-apply/${params.id}`)
      if (response.data.success) {
        toast({
          title: "Success",
          description: "You have been added to the next round.",
        })
        setStudentStatus('In Progress')
        setRoundName('Second Round')
      } else {
        toast({
          title: "Error",
          description: response.data.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Failed to apply:', error)
      toast({
        title: "Error",
        description: "Failed to apply. Please try again.",
        variant: "destructive",
      })
    } finally {
      setShowWillingDialog(false)
    }
  }

  const handleNotWilling = async () => {
    try {
      const response = await axios.post(`/api/student/not-willing/${params.id}`, { reason })
      if (response.data.success) {
        toast({
          title: "Success",
          description: "Your response has been recorded.",
        })
        setStudentStatus('Not Willing')
      } else {
        toast({
          title: "Error",
          description: response.data.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Failed to submit not willing response:', error)
      toast({
        title: "Error",
        description: "Failed to submit response. Please try again.",
        variant: "destructive",
      })
    } finally {
      setShowNotWillingDialog(false)
      setReason('')
    }
  }

  if (loading) {
     return <CompanySkeleton />
   }

  if (!company) {
    return <div className="container mx-auto p-6">Company not found</div>
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
           <Link
        href="/companies"
        className="inline-flex items-center text-[#244855] hover:text-[#E64833] transition-colors"
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        Back to Companies
      </Link>
      <div className="grid gap-8 md:grid-cols-3">
        <CompanyDetails
          name={company.name}
          description={company.description}
          location={company.location}
          salary={company.salary}
          bond={company.bond}
        />
        <EligibilityCriteria criteria={company.criteria} />
      </div>
      <Card className="bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-[#244855]">Your Status</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg mb-4">Current Status: <span className="font-semibold text-[#E64833]">{studentStatus}</span></p>
          {roundName && <p className="text-lg mb-4">Current Round: <span className="font-semibold text-[#E64833]">{roundName}</span></p>}
          
          {isEligible && studentStatus === 'Eligible' && (
            
            <div className="space-x-4 mt-4">
                <div>
                <p className="text-lg mb-4">Deadline to Apply: <span className="font-semibold text-[#E64833]">{new Date(company.willingnessRequests.deadline).toLocaleDateString()}</span></p>
                   
                  
                </div>
              <Button 
                onClick={() => setShowWillingDialog(true)}
                className="bg-[#244855] hover:bg-[#1a3640] text-white"
              >
                Willing to Apply
              </Button>
              <Button 
                onClick={() => setShowNotWillingDialog(true)}
                variant="outline"
                className="border-[#244855] text-[#244855] hover:bg-[#244855] hover:text-white"
              >
                Not Willing
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={showWillingDialog} onOpenChange={setShowWillingDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Application</DialogTitle>
            <DialogDescription>
              Are you sure you want to apply for this position? Please review the company details and eligibility criteria before confirming.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowWillingDialog(false)}>Cancel</Button>
            <Button onClick={handleWillingToApply}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showNotWillingDialog} onOpenChange={setShowNotWillingDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Not Willing to Apply</DialogTitle>
            <DialogDescription>
              Please provide a reason for not willing to apply for this position.
            </DialogDescription>
          </DialogHeader>
          <Textarea
            placeholder="Enter your reason here"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="mb-4"
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNotWillingDialog(false)}>Cancel</Button>
            <Button onClick={handleNotWilling} disabled={!reason.trim()}>Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

