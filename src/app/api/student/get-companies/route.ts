import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/dbConnect'
import CompanyModel from '@/model/AddCompany'
import { getServerSession } from "next-auth/next"
import { authOptions } from '@/app/api/auth/[...nextauth]/options';

export const revalidate = 0;
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'student') {
      return NextResponse.json({
        success: false,
        message: 'Unauthorized',
      }, { status: 401 })
    }

    await dbConnect()

    const companies = await CompanyModel.find({}, 'name location salary createdAt')

    return NextResponse.json({
      success: true,
      message: 'Companies retrieved successfully',
      companies: companies
    }, { status: 200 })
  } catch (error) {
    console.error('Error fetching companies:', error)
    return NextResponse.json({
      success: false,
      message: 'Error fetching companies',
    }, { status: 500 })
  }
}

