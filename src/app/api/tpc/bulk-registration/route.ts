import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from 'next/server';
import { sendCredentialsEmail } from "@/helpers/sendCredentialsEmail";

interface Student {
  prn: string;
  email: string;
  department: string;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  await dbConnect();

  try {
    const { students } = await request.json();
    const results: { prn: string; status: 'success' | 'failed' | 'skipped'; message?: string }[] = [];

    for (const student of students) {
      try {
        
        const existingUser = await UserModel.findOne({
          $or: [
            { username: student.prn },
            { email: student.email }
          ]
        });

        if (existingUser) {
          results.push({ prn: student.prn, status: 'skipped', message: 'User already exists' });
          continue;
        }

        // Generate password
        const password = `${student.prn}@rcpit`;
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new UserModel({
          username: student.prn,
          email: student.email,
          password: hashedPassword,
          department: student.department,
          isVerified: true,
          isAcceptingMessage: true,
          messages: []
        });

        await newUser.save();

        // Send credentials email
        await sendCredentialsEmail(
          student.email,
          student.prn,
          password,
          student.department
        );

        results.push({ prn: student.prn, status: 'success' });
      } catch (error) {
        console.error(`Error processing student ${student.prn}:`, error);
        results.push({ prn: student.prn, status: 'failed', message: (error as Error).message });
      }
    }

    const successCount = results.filter(r => r.status === 'success').length;
    const failedCount = results.filter(r => r.status === 'failed').length;
    const skippedCount = results.filter(r => r.status === 'skipped').length;

    return NextResponse.json({
      success: true,
      message: `Processed ${students.length} students. Success: ${successCount}, Failed: ${failedCount}, Skipped: ${skippedCount}`,
      results
    });

  } catch (error) {
    console.error('Error in bulk registration:', error);
    return NextResponse.json({
      success: false,
      message: "Error processing bulk registration"
    }, { status: 500 });
  }
}
