import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/dbConnect'
import CompanyModel from '@/model/AddCompany'
import { getServerSession } from "next-auth/next"
import { authOptions } from '@/app/api/auth/[...nextauth]/options';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'student') {
      return NextResponse.json({
        success: false,
        message: 'Unauthorized',
      }, { status: 401 })
    }

    await dbConnect()

    const { id } = params
    const company = await CompanyModel.findById(id)

    if (!company) {
      return NextResponse.json({
        success: false,
        message: 'Company not found',
      }, { status: 404 })
    }

    const studentId = session.user._id

   
    company.willingnessRequests.students = company.willingnessRequests.students.filter(
      (id: string) => id.toString() !== studentId
    )

    // Add student to round 2
    const round2 = company.rounds.find((round: any) => round.roundNumber === 2)
    if (round2) {
      round2.selectedStudents.push(studentId)
    } else {
      company.rounds.push({
        roundNumber: 2,
        roundName: 'Second Round',
        selectedStudents: [studentId]
      })
    }

    await company.save()

    return NextResponse.json({
      success: true,
      message: 'Successfully added to round 2',
    }, { status: 200 })
  } catch (error) {
    console.error('Error updating company:', error)
    return NextResponse.json({
      success: false,
      message: 'Error updating company',
    }, { status: 500 })
  }
}

