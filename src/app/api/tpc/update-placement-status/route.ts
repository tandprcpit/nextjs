import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import CompanyModel from "@/model/AddCompany";
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest): Promise<NextResponse> {
    await dbConnect();

    try {
        const { studentId, companyId, internshipPackage, fullTimePackage, positionInternship, positionFullTime } = await request.json();

   
        if (!studentId || !companyId) {
            return NextResponse.json({
                success: false,
                message: "Student ID and Company ID are required."
            }, { status: 400 });
        }

        const student = await UserModel.findById(studentId);
        if (!student) {
            return NextResponse.json({
                success: false,
                message: "Student not found."
            }, { status: 404 });
        }


        const company = await CompanyModel.findById(companyId);
        if (!company) {
            return NextResponse.json({
                success: false,
                message: "Company not found."
            }, { status: 404 });
        }

       
        const placementDetails = {
            internshipPackage,
            fullTimePackage,
            positionInternship,
            positionFullTime
        };

       
        student.placedCompanies.push({
            company: companyId,
            ...placementDetails
        });

      
        await student.save();

       
        company.placedStudents.push({
            student: studentId,
            ...placementDetails
        });

       
        await company.save();

        return NextResponse.json({
            success: true,
            message: "Placement details updated successfully."
        }, { status: 200 });

    } catch (error) {
        console.error("Error updating placement status:", error);
        return NextResponse.json({
            success: false,
            message: "Error updating placement status. Please try again."
        }, { status: 500 });
    }
}
