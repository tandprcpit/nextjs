import { NextRequest, NextResponse } from 'next/server'
import dbConnect from "@/lib/dbConnect"
import UserModel from "@/model/User"

export async function POST(request: NextRequest): Promise<NextResponse> {
  await dbConnect()

  try {
    const { prn, email, otp } = await request.json()

    const user = await UserModel.findOne({
      username: prn,
      email,
      verifyCode: otp,
      verifyCodeExpiry: { $gt: new Date() }
    })

    if (!user) {
      return NextResponse.json({
        success: false,
        message: "Invalid or expired verification code"
      }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      message: "Verification code is valid"
    }, { status: 200 })

  } catch (error) {
    console.error('Error in verifying OTP:', error)
    return NextResponse.json({
      success: false,
      message: "Error verifying OTP"
    }, { status: 500 })
  }
}

