import { NextRequest, NextResponse } from 'next/server'
import dbConnect from "@/lib/dbConnect"
import UserModel from "@/model/User"
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail"

export async function POST(request: NextRequest): Promise<NextResponse> {
  await dbConnect()

  try {
    const { prn, email } = await request.json()

    const user = await UserModel.findOne({ username: prn, email })

    if (!user) {
      return NextResponse.json({
        success: false,
        message: "No user found with this PRN and email"
      }, { status: 404 })
    }

    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString()
    user.verifyCode = verifyCode
    user.verifyCodeExpiry = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes expiry
    await user.save()

    const emailResponse = await sendVerificationEmail(email, prn, verifyCode)

    if (!emailResponse.success) {
      return NextResponse.json({
        success: false,
        message: emailResponse.message
      }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: "New verification code sent to your email"
    }, { status: 200 })

  } catch (error) {
    console.error('Error in resending OTP:', error)
    return NextResponse.json({
      success: false,
      message: "Error resending verification code"
    }, { status: 500 })
  }
}

