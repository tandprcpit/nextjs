import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/options';
import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/User';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest): Promise<NextResponse> {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user) {
    return NextResponse.json({
      success: false,
      message: 'Not Authenticated'
    }, { status: 401 });
  }

  await dbConnect();

  try {
    const user = await UserModel.findOne({ username: session.user.username });
 
    if (!user) {
      return NextResponse.json({
        success: false,
        message: 'User Not Found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'User data retrieved successfully',
      user: user
    }, { status: 200 }); 

  } catch (error) {
    console.error('Error fetching user data:', error);
    return NextResponse.json({
      success: false,
      message: 'Error fetching user data'
    }, { status: 500 });
  }
}
