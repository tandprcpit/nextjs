import { NextRequest, NextResponse } from 'next/server'
import dbConnect from "@/lib/dbConnect"
import UserModel from "@/model/User"
import bcrypt from "bcryptjs"

export async function POST(request: NextRequest): Promise<NextResponse> {
  await dbConnect()

  try {
    const { prn, email, newPassword } = await request.json()

    const user = await UserModel.findOne({ username: prn, email })

    if (!user) {
      return NextResponse.json({
        success: false,
        message: "User not found"
      }, { status: 404 })
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)
    user.password = hashedPassword
    await user.save()

    return NextResponse.json({
      success: true,
      message: "Password reset successfully"
    }, { status: 200 })

  } catch (error) {
    console.error('Error in resetting password:', error)
    return NextResponse.json({
      success: false,
      message: "Error resetting password"
    }, { status: 500 })
  }
}

