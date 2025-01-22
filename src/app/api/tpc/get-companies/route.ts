import dbConnect from "@/lib/dbConnect";
import CompanyModel from "@/model/AddCompany";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;
export const dynamic = "force-dynamic";
export async function GET(request: NextRequest): Promise<NextResponse> {
   
    await dbConnect();

    try {
  
        const companies = await CompanyModel.find({}, "_id name location salary createdAt") .sort({ createdAt: -1 }) ;

        // Return the list of companies with selected fields
        return NextResponse.json(
            {
                success: true,
                companies,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching companies:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Error fetching companies. Please try again.",
            },
            { status: 500 }
        );
    }
}