import dbConnect from "@/lib/dbConnect";
import TPOModel from "@/model/Tpo";
import bcrypt from "bcryptjs";
import { NextRequest,NextResponse } from "next/server";


export async function POST(request: NextRequest): Promise<NextResponse>{
    await dbConnect();
    
    try {
        const {name , email , password} = await request.json();
        const existingTpo = await TPOModel.findOne({
            email
        });

        if(existingTpo)
        {
            return NextResponse.json({
                success: false,
                message: "Tpo is already in System"
            },{status: 400});
        }
        else
        {
            const hashedPassword = await bcrypt.hash(password,10);
            const newTpo = new TPOModel({
                name,
                email,
                password : hashedPassword,
            });

            await newTpo.save();
        }

        return NextResponse.json({
            success:true,
            message:"TPO registered successfully."
        },{status:201})

    } catch (error) {
        console.error('Error registering TPO', error);
        return NextResponse.json({
            success:false,
            message: "Error registering TPO"
        }, {status: 500 })
    }
}