import dbConnect from "@/lib/dbConnect";
import CompanyModel from "@/model/AddCompany";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse> {
    await dbConnect();

    try {
        const { id } = params;
       
        const company = await CompanyModel.findById(id)
            .populate({
                path: 'rounds.selectedStudents',
                select: 'email department overallCGPA firstName middleName lastName username twelfthDiplomaPercentage tenthMarks twelfthDiploma image city',
            });

      


        if (!company) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Company not found.",
                },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                company,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching company:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Error fetching company. Please try again.",
            },
            { status: 500 }
        );
    }
}
