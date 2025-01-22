import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/User';
import { z } from 'zod';
import { usernameValidation } from '@/schemas/signUpSchema';
import { NextRequest, NextResponse } from 'next/server';

const UsernameQuerySchema = z.object({
  username: usernameValidation,
});

export const revalidate = 0;
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  await dbConnect();

  try {
    // Parse the URL and extract query parameters
    const url = new URL(request.url);
    const queryParams = {
      username: url.searchParams.get('username'),
    };

    // Validate query parameters
    const result = UsernameQuerySchema.safeParse(queryParams);

    if (!result.success) {
      const usernameErrors = result.error.format().username?._errors || [];
      return NextResponse.json(
        {
          success: false,
          message:
            usernameErrors.length > 0
              ? usernameErrors.join(', ')
              : 'Invalid query parameters',
        },
        { status: 400 }
      );
    }

    const { username } = result.data;

    // Check if the username is already taken
    const existingVerifiedUser = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existingVerifiedUser) {
      return NextResponse.json(
        {
          success: false,
          message: 'Username is already taken',
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Username is unique',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error checking username:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Error checking username',
      },
      { status: 500 }
    );
  }
}
