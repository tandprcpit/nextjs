import { openai } from '@ai-sdk/openai'
import { streamText } from 'ai'
import { getServerSession } from "next-auth"
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import dbConnect from "@/lib/dbConnect"
import CompanyQuestionModel from "@/model/CompanyQuestions"

export const maxDuration = 30

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    return new Response(JSON.stringify({
      success: false,
      message: "Not Authenticated"
    }), { status: 401 })
  }

  await dbConnect()

  try {
    const companyQuestions = await CompanyQuestionModel.find({}).lean()
    const { messages } = await req.json()

    console.log("companyQuestions",companyQuestions)
    const companyQuestionsPrompt = companyQuestions.length > 0
      ? `Here are some company-specific questions you can use to help students which visited in r c patel instutute of technology shirpur:\n${companyQuestions.map(q => `- ${q.question}`).join('\n')}`
      : "There are no company-specific questions available at the moment."

    const result = streamText({
      model: openai('gpt-4o-mini'),
      system: `You are a helpful assistant for student placement guidance. Provide concise, relevant information about job placements, interview tips, and career advice for students. ${companyQuestions}`,
      messages,
    })

    return (await result).toDataStreamResponse();
  } catch (error) {
    console.error('Error in chat API:', error)
    return new Response(JSON.stringify({
      success: false,
      message: "Error processing chat request"
    }), { status: 500 })
  }
}

