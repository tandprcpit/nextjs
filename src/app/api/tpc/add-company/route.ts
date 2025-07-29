import dbConnect from "@/lib/dbConnect";
import CompanyModel from "@/model/AddCompany";
import UserModel from "@/model/User";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export const revalidate = 0;
export const dynamic = "force-dynamic";


export async function POST(request: NextRequest): Promise<NextResponse> {
    await dbConnect();
    try {
        const token = await getToken({ req: request });
        
        if (!token) {
            return NextResponse.json(
                { success: false, message: "Unauthorized access." },
                { status: 401 }
            );
        }

        const {
            name,
            description,
           
            bond,
            location,
            profiles,
            criteria,
            rounds,
        } = await request.json();

     console.log("criteria",criteria);

        if (!name || !profiles || !Array.isArray(profiles) || profiles.length === 0 || !location) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Name, location, and at least one profile are required.",
                },
                { status: 400 }
            );
        }

        const existingCompany = await CompanyModel.findOne({ name });
        if (existingCompany) {
            return NextResponse.json(
                {
                    success: false,
                    message: "A company with this name already exists.",
                },
                { status: 400 }
            );
        }

     
        const {
            overallCGPA,
            gender,
            passoutYear,
            anyLiveKTs,
            anyGapDuringEducation,
            department,
            tenthMarks,
            twelfthPercentage,
        } = criteria;

        const matchingStudents = await UserModel.find({
            overallCGPA: { $gte: overallCGPA || 0 },
            gender: { $in: gender || [] },
            passoutYear,
            anyLiveKTs: { $lte: anyLiveKTs },
            anyGapDuringEducation: { $in: anyGapDuringEducation },
            department: { $in: department || [] },
            tenthMarks: { $gte: tenthMarks || 0 },
            twelfthDiplomaPercentage: { $gte: twelfthPercentage || 0 },
        }).select("_id");



        const selectedStudentIds = matchingStudents.map((student) => student._id);

       

        
        const eligibleStudents = {
            roundNumber: 1,
            roundName: "Eligible Students",
            selectedStudents: selectedStudentIds, 
        };
        const acceptStudents = {
            roundNumber: 2,
            roundName: "Accept Willingness Students",
            selectedStudents: [], 
        };

     
      const filteredUserRounds = rounds.filter(
  (round: { roundName: string }) =>
    !["Eligible Students", "Accept Willingness Students"].includes(round.roundName)
);

const allRounds = [eligibleStudents, acceptStudents, ...filteredUserRounds];


        const newCompany = new CompanyModel({
            name,
            description,
            
            bond,
            location,
            profiles,
            criteria,
            rounds: allRounds, 
            createdBy: token?._id,
        });

        console.log("newCompany",newCompany)
        await newCompany.save();

        return NextResponse.json(
            {
                success: true,
                message: "Company added successfully.",
                company: newCompany,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error adding company:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Error adding company. Please try again.",
            },
            { status: 500 }
        );
    }
}


