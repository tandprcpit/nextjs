import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import CompanyModel from "@/model/AddCompany";
import { NextRequest, NextResponse } from 'next/server';
import mongoose, { Schema, Document } from "mongoose";

// Define the Placement interface
interface Placement {
    student: mongoose.Schema.Types.ObjectId;
    internshipPackage?: number;
    fullTimePackage?: number;
    positionInternship?: string;
    positionFullTime?: string;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
    await dbConnect();

    try {
        const { studentId, companyId } = await request.json();

        // Validate required fields
        if (!studentId || !companyId) {
            return NextResponse.json({
                success: false,
                message: "Student ID and Company ID are required."
            }, { status: 400 });
        }

        // Fetch the student by ID
        const student = await UserModel.findById(studentId);
        if (!student) {
            return NextResponse.json({
                success: false,
                message: "Student not found."
            }, { status: 404 });
        }

        // Fetch the company by ID
        const company = await CompanyModel.findById(companyId);
        if (!company) {
            return NextResponse.json({
                success: false,
                message: "Company not found."
            }, { status: 404 });
        }

        // Remove placement details from the student model
        student.placedCompanies = student.placedCompanies.filter(
            (placement) => placement.company.toString() !== companyId
        );

        // Save the updated student document
        await student.save();

        // Remove placement details from the company model
        company.placedStudents = (company.placedStudents as Placement[]).filter(
            (placement) => placement.student.toString() !== studentId
        );

        // Save the updated company document
        await company.save();

        return NextResponse.json({
            success: true,
            message: "Placement details removed successfully."
        }, { status: 200 });

    } catch (error) {
        console.error("Error removing placement status:", error);
        return NextResponse.json({
            success: false,
            message: "Error removing placement status. Please try again."
        }, { status: 500 });
    }
}
