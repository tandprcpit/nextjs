import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export async function POST(request: Request): Promise<Response> {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return new Response(JSON.stringify({
            success: false,
            message: "Not Authenticated"
        }), { status: 401 });
    }

    await dbConnect();

    try {
        const { username, email, ...otherDetails } = await request.json();
        

        const updatedUser = await UserModel.findOneAndUpdate(
            { username, isVerified: true },
            { $set: otherDetails },
            { new: true }
        );

        if (!updatedUser) {
            return new Response(JSON.stringify({
                success: false,
                message: "User Not Found"
            }), { status: 400 });
        }

        return new Response(JSON.stringify({
            success: true,
            message: "Profile updated successfully",
            user: updatedUser
        }), { status: 200 });

    } catch (error) {
        console.error('Error updating user profile:', error);
        return new Response(JSON.stringify({
            success: false,
            message: "Error updating user profile"
        }), { status: 500 });
    }
}