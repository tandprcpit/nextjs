"use client"

import { useUserContext } from "@/context/AppContext"
import { StudentProfile } from '@/components/student/StudentProfile'
import InformationTab from '@/components/student/InformationTab'
import Link from "next/link"
import { ChevronLeft } from "lucide-react"


export default function UserProfile() {
  const { studentData, loading } = useUserContext()

  return (
    <div className="container mx-auto p-4">
       <div className="flex justify-end">
  <Link
    href="/update-profile"
    className="inline-flex items-center text-[#244855] hover:text-[#E64833] transition-colors"
  >
    <ChevronLeft className="mr-2 h-4 w-4" />
    Update Profile
  </Link>
</div>
     
      <StudentProfile studentData={studentData} loading={loading} />
      <InformationTab studentData={studentData} loading={loading} />
    </div>
  )
}

