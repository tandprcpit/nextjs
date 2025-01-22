import dbConnect from "@/lib/dbConnect";
import CompanyModel from "@/model/AddCompany";
import { NextRequest, NextResponse } from "next/server";
import mongoose, { Types } from "mongoose";


interface Round {
    roundNumber: number;
    roundName: string;
    selectedStudents: Types.ObjectId[]; 
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse> {
    await dbConnect();

    try {
        const { id } = params;
        const { roundNumber, selectedStudents }: { roundNumber: number, selectedStudents: Types.ObjectId[] } = await request.json();

      console.log("api is fetched --> ",roundNumber,selectedStudents,id)

        if (!roundNumber || !selectedStudents) {
            return NextResponse.json(
                {
                    success: false,
                    message: "roundNumber and selectedStudents are required.",
                },
                { status: 400 }
            );
        }

       
        const company = await CompanyModel.findById(id);
        if (!company) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Company not found.",
                },
                { status: 404 }
            );
        }

       
        const roundIndex = company.rounds.findIndex((round: Round) => round.roundNumber === roundNumber);

        if (roundIndex === -1) {
            return NextResponse.json(
                {
                    success: false,
                    message: `Round with number ${roundNumber} not found.`,
                },
                { status: 404 }
            );
        }

        // Update the selected students for the specific round
        company.rounds[roundIndex].selectedStudents = selectedStudents;

        // Save the updated company document
        await company.save();

        return NextResponse.json(
            {
                success: true,
                message: "Round updated successfully.",
                company,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error updating round:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Error updating round. Please try again.",
            },
            { status: 500 }
        );
    }
}
