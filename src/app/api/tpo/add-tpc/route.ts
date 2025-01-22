import dbConnect from "@/lib/dbConnect";
import TPCModel from "@/model/Tpc";
import bcrypt from "bcryptjs";
import {NextRequest,NextResponse} from "next/server";
import { getToken } from "next-auth/jwt";

export async function POST(request:NextRequest):Promise<NextResponse>
{
    await dbConnect();

    try{
        const token = await getToken({req:request});
        if(!token || !token._id)
        {
            return NextResponse.json({
                success:false,
                message: "TPO Is Not Login, TPO Login First"
            },{status:401})
        }
        const {name,email,password} = await request.json();
        const existingTpc = await TPCModel.findOne({
            email
        });

        if(existingTpc)
        {
            return NextResponse.json({
                success:false,
                message: "TPC is already in System"
            },{status: 400})
        }else{
            const hashedPassword = await bcrypt.hash(password,10);
            const newTpc = new TPCModel({
                name,
                email,
                password: hashedPassword,
                createdBy: token._id,
            });
            await newTpc.save();
        }

        return NextResponse.json({
            success:true,
            message:"TPC registered successfully."
        },{status:201})
    }catch (error){
        console.error('Error registering TPC',error);
        return NextResponse.json({
            success:false,
            message:"Error registering TPC"
        },{status:500})
    }
}