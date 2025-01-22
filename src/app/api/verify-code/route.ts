import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest): Promise<NextResponse> {
    await dbConnect();

    try {
        const { username, code } = await request.json();

        if (!username || !code) {
            return NextResponse.json({
                success: false,
                message: "Username and verification code are required"
            }, { status: 400 });
        }
    
        const decodedUsername = decodeURIComponent(username);
     
        const user = await UserModel.findOne({ username: new RegExp(`^${decodedUsername}$`, 'i') });

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User not found"
            }, { status: 404 }); 
        }

        const isCodeValid = user.verifyCode === code;
        const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

        if (isCodeValid && isCodeNotExpired) {
            user.isVerified = true;
            await user.save();
            return NextResponse.json({
                success: true,
                message: "Account verified successfully"
            }, { status: 200 });
        } else if (!isCodeNotExpired) {
            return NextResponse.json({
                success: false,
                message: "Verification code has expired, please sign up again to get a new code"
            }, { status: 400 });
        } else {
            return NextResponse.json({
                success: false,
                message: "Incorrect verification code"
            }, { status: 400 });
        }

    } catch (error) {
        console.error("Error verifying User:", error);

        return NextResponse.json({
            success: false,
            message: "Error verifying user"
        }, { status: 500 });
    }
}
