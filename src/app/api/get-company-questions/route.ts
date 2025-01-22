import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import CompanyQuestionModel from "@/model/CompanyQuestions";

export async function GET(request: Request): Promise<Response> {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return new Response(JSON.stringify({
            success: false,
            message: "Not Authenticated"
        }), { status: 401 });
    }

    await dbConnect();

    try {
        const companyQuestions = await CompanyQuestionModel.find({}).lean();

        if (!companyQuestions || companyQuestions.length === 0) {
            return new Response(JSON.stringify({
                success: true,
                message: "No company questions found",
                questions: []
            }), { status: 200 });
        }

        return new Response(JSON.stringify({
            success: true,
            message: "Company questions fetched successfully",
            questions: companyQuestions
        }), { status: 200 });

    } catch (error) {
        console.error('Error fetching company questions:', error);
        return new Response(JSON.stringify({
            success: false,
            message: "Error fetching company questions"
        }), { status: 500 });
    }
}

