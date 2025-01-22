'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { toast } from '@/components/ui/use-toast'
import { CompanyDetails } from '@/components/tpc/CompanyDetails'
import { EligibilityCriteria } from '@/components/tpc/EligibilityCriteria'
import { SelectionRounds } from '@/components/tpc/SelectionRounds'
import { PlacedStudents } from '@/components/tpc/PlacedStudents'
import { NotWillingStudents } from '@/components/tpc/NotWillingStudents'
import { CompanySkeleton } from '@/components/tpc/CompanySkeleton'

interface PlacementDetails {
  internshipPackage?: number;
  fullTimePackage?: number;
  positionInternship?: string;
  positionFullTime?: string;
}

interface Company {
  _id: string
  name: string
  description: string
  salary: number
  bond: string
  location: string
  criteria: {
    overallCGPA: number
    gender: string[]
    passoutYear: number
    anyLiveKTs: string
    anyGapDuringEducation: string
    department: string[]
    tenthMarks: number
    twelfthPercentage: number
    diplomaPercentage: number
    skills: string[]
  }
  rounds: {
    roundNumber: number
    roundName: string
    selectedStudents: Student[]
  }[]
  placedStudents: {
    student: string
    internshipPackage?: number
    fullTimePackage?: number
    positionInternship?: string
    positionFullTime?: string
  }[]
  willingnessRequests: {
    student: string
    deadline: string
  }[]
  notWillingStudents: {
    student: string
    reason: string
  }[]
}

interface Student {
  _id: string
  firstName: string
  middleName:string
  lastName: string
  email: string
  department: string
  username: string
  image: string
  city: string
  twelfthDiploma: string
  overallCGPA: number
  tenthMarks: number
  twelfthDiplomaPercentage: number
}

export default function SingleCompanyPage() {
  const [company, setCompany] = useState<Company | null>(null)
  const [loading, setLoading] = useState(true)
  const params = useParams<{ id: string }>()
 
  useEffect(() => {
    async function fetchCompany() {
      try {
        const response = await axios.get(`/api/tpc/get-company/${params.id}`)
        setCompany(response.data.company)
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

  const handleDelete = async (roundNumber: number, selectedStudents: string[]) => {
    if (!company) return

    const updatedRounds = company.rounds.map(round => {
      if (round.roundNumber === roundNumber) {
        return {
          ...round,
          selectedStudents: round.selectedStudents.filter(
            student => !selectedStudents.includes(student._id)
          )
        }
      }
      return round
    })

    setCompany({ ...company, rounds: updatedRounds })

    toast({
      title: "Students Removed",
      description: `Selected students have been removed from Round ${roundNumber}.`,
    })
  }

  const handleSave = async (roundNumber: number, selectedStudents: Student[]) => {
    if (!company) return

    try {
      await axios.patch(`/api/tpc/update-round/${params.id}`, {
        roundNumber,
        selectedStudents: selectedStudents.map(student => student._id)
      })
      toast({
        title: "Changes Saved",
        description: `Round ${roundNumber} has been updated successfully.`,
      })
    } catch (error) {
      console.error('Failed to save changes:', error)
      toast({
        title: "Error",
        description: "Failed to save changes. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleSearchStudents = async (query: string, passoutYear: number) => {
    try {
      const response = await axios.get(`/api/tpc/search-students`, {
        params: { query, passoutYear }
      })
      return response.data.students
    } catch (error) {
      console.error('Failed to search students:', error)
      toast({
        title: "Error",
        description: "Failed to search students. Please try again.",
        variant: "destructive",
      })
      return []
    }
  }

  const handleUpdateRound = (updatedRound: Company['rounds'][0]) => {
    if (!company) return
    const updatedRounds = company.rounds.map(round =>
      round.roundNumber === updatedRound.roundNumber ? updatedRound : round
    )
    setCompany({ ...company, rounds: updatedRounds })
  }

  const handleAddToNextRound = (currentRoundNumber: number, selectedStudents: Student[]) => {
    if (!company) return

    const updatedRounds = company.rounds.map((round, index) => {
      if (round.roundNumber === currentRoundNumber + 1) {
        return {
          ...round,
          selectedStudents: [...round.selectedStudents, ...selectedStudents]
        }
      }
      return round
    })

    setCompany({ ...company, rounds: updatedRounds })

    toast({
      title: "Students Added to Next Round",
      description: `Selected students have been added to Round ${currentRoundNumber + 1}.`,
    })
  }

  const handleUpdatePlacementStatus = async (studentId: string, placementDetails: PlacementDetails) => {
    if (!company) return

    try {
      await axios.post(`/api/tpc/update-placement-status`, {
        studentId,
        companyId: company._id,
        ...placementDetails
      })

      const updatedPlacedStudents = [
        ...company.placedStudents.filter(ps => ps.student !== studentId),
        { student: studentId, ...placementDetails }
      ]

      setCompany({ ...company, placedStudents: updatedPlacedStudents })

      toast({
        title: "Placement Status Updated",
        description: `Student placement status has been updated successfully.`,
      })
    } catch (error) {
      console.error('Failed to update placement status:', error)
      toast({
        title: "Error",
        description: "Failed to update placement status. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleRemovePlacementStatus = async (studentId: string, companyId: string) => {
    if (!company) return

    try {
      await axios.post(`/api/tpc/remove-placement-status`, {
        studentId,
        companyId
      })

      const updatedPlacedStudents = company.placedStudents.filter(ps => ps.student !== studentId)

      setCompany({ ...company, placedStudents: updatedPlacedStudents })

      toast({
        title: "Placement Status Removed",
        description: "Student placement status has been removed successfully.",
      })
    } catch (error) {
      console.error('Failed to remove placement status:', error)
      toast({
        title: "Error",
        description: "Failed to remove placement status. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return <CompanySkeleton />
  }

  if (!company) {
    return <div className="text-center text-2xl text-[#244855]">Company not found</div>
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      <Link
        href="/tpc/companies"
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

      <SelectionRounds
        rounds={company.rounds}
        onDelete={handleDelete}
        onSave={handleSave}
        onSearchStudents={handleSearchStudents}
        passoutYear={company.criteria.passoutYear}
        onUpdateRound={handleUpdateRound}
        onAddToNextRound={handleAddToNextRound}
        onUpdatePlacementStatus={handleUpdatePlacementStatus}
        onRemovePlacementStatus={handleRemovePlacementStatus}
        companyId={company._id}
        companyName={company.name}
        companyLocation={company.location}
        companyPackage={company.salary}
        companyBond={company.bond}
        placedStudents={company.placedStudents}
      />

      <PlacedStudents
        companyName={company.name}
        companyLocation={company.location}
        companyPackage={company.salary}
        companyBond={company.bond}
        placedStudents={company.placedStudents.map(ps => {
          const student = company.rounds.flatMap(r => r.selectedStudents).find(s => s._id === ps.student);
          return {
            ...ps,
            _id: ps.student,
            firstName: student?.firstName || '',
            middleName: student?.middleName || '',
            lastName: student?.lastName || '',
            email: student?.email || '',
            department: student?.department || '',
            username: student?.username || '',
            image: student?.image || '/placeholder-user.jpg',
            city: student?.city || '', 
          };
        })}
      />

      <NotWillingStudents
      companyName={company.name}
        students={(company.notWillingStudents || []).map(nws => {
          const student = company.rounds.flatMap(r => r.selectedStudents).find(s => s._id === nws.student);
          return {
            ...nws,
            _id: nws.student,
            firstName: student?.firstName || '',
            middleName: student?.middleName || '',
            lastName: student?.lastName || '',
            email: student?.email || '',
            department: student?.department || '',
            username: student?.username || '',
          };
        })}
      />
    </div>
  )
}

