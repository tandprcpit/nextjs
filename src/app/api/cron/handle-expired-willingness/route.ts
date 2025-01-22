import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/dbConnect'
import CompanyModel from '@/model/AddCompany'

export async function GET(request: NextRequest) {
  try {
    await dbConnect()

    const companies = await CompanyModel.find({
      'willingnessRequests.deadline': { $lt: new Date() }
    })

    for (const company of companies) {
      const expiredStudents = company.willingnessRequests.students

     
      company.notWillingStudents.push(
        ...expiredStudents.map((studentId: string) => ({
          student: studentId,
          reason: 'Deadline expired'
        }))
      )

    
      company.willingnessRequests = {
        students: [],
        deadline: new Date()
      }

      await company.save()
    }

    return NextResponse.json({ message: 'Expired willingness requests handled successfully' })
  } catch (error) {
    console.error('Error handling expired willingness requests:', error)
    return NextResponse.json({ error: 'Error handling expired willingness requests' }, { status: 500 })
  }
}

