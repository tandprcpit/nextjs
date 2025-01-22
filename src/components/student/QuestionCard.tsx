import { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, User, Calendar } from 'lucide-react'

interface QuestionCardProps {
  question: {
    company: string
    questions: string[]
    studentName: string
    review: string
    createdAt: string
  }
}

export function QuestionCard({ question }: QuestionCardProps) {
  const [expanded, setExpanded] = useState(false)

  const displayQuestions = expanded ? question.questions : question.questions.slice(0, 5)

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md border-t-4 border-t-[#244855] h-full">
      <CardHeader className="bg-[#90AEAD] p-2">
        <CardTitle className="text-lg text-[#244855] font-bold flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          {question.company}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-2 space-y-2 flex-grow">
        <ul className="space-y-2">
          {displayQuestions.map((q, index) => (
            <li key={index} className="flex items-start bg-white rounded-md shadow-sm">
              <span className="font-semibold text-[#244855] mr-2 flex-shrink-0 text-sm">{index + 1}.</span>
              <span className="text-gray-700 text-sm break-words">{q}</span>
            </li>
          ))}
        </ul>
        {question.questions.length > 5 && (
          <Button
            variant="outline"
            onClick={() => setExpanded(!expanded)}
            className="w-full mt-2 text-sm text-[#244855] hover:text-[#E64833] hover:bg-[#FBE9D0]"
          >
            {expanded ? (
              <>
                <ChevronUp className="h-4 w-4 mr-1" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4 mr-1" />
                Show More ({question.questions.length - 5} more)
              </>
            )}
          </Button>
        )}
        <div className="mt-2 p-2 text-[#90AEAD] rounded-md">
          <h3 className="font-semibold text-[#874F41] mb-1 text-sm flex items-center">
            Review:
          </h3>
          <p className="text-gray-700 text-sm break-words">{question.review || "No review provided."}</p>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 flex justify-between items-center py-2 px-3 ">
        <div className="flex items-center space-x-2">
          <User className="h-4 w-4 text-gray-500" />
          <span className="text-xs text-gray-500">Added by:</span>
          <span className="font-medium text-gray-700 text-sm">{question.studentName}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-gray-500" />
          <span className="text-xs text-gray-500">Date:</span>
          <span className="font-medium text-gray-700 text-sm">{new Date(question.createdAt).toLocaleDateString()}</span>
        </div>
      </CardFooter>
    </Card>
  )
}

