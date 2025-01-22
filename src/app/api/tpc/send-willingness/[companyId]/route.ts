import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/dbConnect'
import CompanyModel from '@/model/AddCompany'



export const revalidate = 0;
export const dynamic = "force-dynamic";

export async function POST(
  request: NextRequest,
  { params }: { params: { companyId: string } }
) {
  try {
  

    await dbConnect()

    const { companyId } = params
    const { studentIds, deadline } = await request.json()

    const company = await CompanyModel.findById(companyId)

    if (!company) {
      return NextResponse.json({ error: 'Company not found' }, { status: 404 })
    }

    
    if (!company.willingnessRequests) {
      company.willingnessRequests = {
        students: [],
        deadline: new Date(deadline)
      }
    } else {

      company.willingnessRequests.deadline = new Date(deadline)
    }

  
    studentIds.forEach((studentId: string) => {
      if (!company.willingnessRequests.students.includes(studentId)) {
        company.willingnessRequests.students.push(studentId)
      }
    })

    await company.save()

    return NextResponse.json({ message: 'Willingness requests sent successfully' }, { status: 200 })
  } catch (error) {
    console.error('Error sending willingness requests:', error)
    return NextResponse.json({ error: 'Error sending willingness requests' }, { status: 500 })
  }
}

  