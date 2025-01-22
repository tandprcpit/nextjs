"use client"

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios'
import { StudentProfile } from '@/components/student/StudentProfile'

export default function Component() {
  const [studentData, setStudentData] = useState(null)
  const [loading, setLoading] = useState(true)
  const params = useParams<{ username: string }>()

  useEffect(() => {
    const fetchStudentData = async () => {
      if (params?.username) {
        try {
          const response = await axios.post(`/api/unique-student-data`, {
            username: params.username,
          })
          setStudentData(response.data.data)
        } catch (error) {
          console.error("Failed to fetch student data:", error)
        } finally {
          setLoading(false)
        }
      }
    }
    fetchStudentData()
  }, [params?.username])

  return <StudentProfile studentData={studentData} loading={loading} />
}

