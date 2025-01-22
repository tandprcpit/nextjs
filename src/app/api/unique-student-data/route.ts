import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/User';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    await dbConnect(); 

    try {
       
        const { username } = await request.json();

      
        const decodedUsername = decodeURIComponent(username);

     
        const user = await UserModel.findOne({ username: new RegExp(`^${decodedUsername}$`, 'i') })
            .select('firstName lastName middleName email mobileNumber image department areaOfInterest aboutYou githubLink linkedinLink leetcodeLink personalPortfolioLink instagramLink resumeLink twitterLink hackerRankLink codechefLink geeksForGeeksLink projectTitle1 projectLink1 projectDescription1 projectTitle2 projectLink2 projectDescription2 skills'); // Projection: select only required fields

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User not found"
            }, { status: 404 });
        }

        
        return NextResponse.json({
            success: true,
            data: user
        }, { status: 200 });

    } catch (error) {
        console.error('Error fetching student data:', error);

        return NextResponse.json({
            success: false,
            message: "Error fetching student data"
        }, { status: 500 });
    }
}
