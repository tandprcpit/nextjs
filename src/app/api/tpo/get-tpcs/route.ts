import dbConnect from "@/lib/dbConnect";
import TPCModel from "@/model/Tpc";
import { NextRequest,NextResponse } from "next/server";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export async function GET():Promise<NextResponse>
{
    await dbConnect();

    try{
        const tpcs = await TPCModel.find();

        return NextResponse.json({
            success: true,
            data:tpcs,
        });

    }catch (error)
    {
        console.log("Error Fetching TPCs:",error);

        return NextResponse.json({
            success:false,
            message:"error fetching TPCs"
        },{status:500})
    }
}