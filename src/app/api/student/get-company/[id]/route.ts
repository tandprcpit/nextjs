import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/dbConnect'
import CompanyModel from '@/model/AddCompany'
import { getServerSession } from "next-auth/next"
import { authOptions } from '@/app/api/auth/[...nextauth]/options'

export const revalidate = 0;
export const dynamic = "force-dynamic";


export async function GET(
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

        let studentStatus = 'Not Eligible'
        let roundName = ''
        const studentId = session.user._id


        for (const round of company.rounds) {
            if (round.selectedStudents.includes(studentId)) {
                studentStatus = `You are in ${round.roundName} round`
                // roundName = round.roundName
                // break
            }
        }

        const isEligible = company.willingnessRequests.students.includes(studentId)
        if (isEligible) {
            studentStatus = 'Eligible'
        }
        if (company.notWillingStudents.some((nws: any) => nws.student.toString() === studentId)) {
            studentStatus = 'Not Willing'
        }


        return NextResponse.json({
            success: true,
            message: 'Company data retrieved successfully',
            company: company,
            studentStatus: studentStatus,
            roundName: roundName,
            isEligible: isEligible
        }, { status: 200 })
    } catch (error) {
        console.error('Error fetching company:', error)
        return NextResponse.json({
            success: false,
            message: 'Error fetching company',
        }, { status: 500 })
    }
}

