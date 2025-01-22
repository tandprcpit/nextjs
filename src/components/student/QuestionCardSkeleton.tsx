import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export function QuestionCardSkeleton() {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md border-t-4 border-t-[#244855]">
      <CardHeader className="bg-[#90AEAD] p-2">
        <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse"></div>
      </CardHeader>
      <CardContent className="pt-2 space-y-2">
        <div className="space-y-2">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="h-4 bg-gray-100 rounded w-full animate-pulse"></div>
          ))}
        </div>
        <div className="mt-2 p-2 rounded-md">
          <div className="h-4 bg-gray-100 rounded w-1/4 mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-100 rounded w-full animate-pulse"></div>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 flex justify-between items-center py-2 px-3">
        <div className="h-4 bg-gray-100 rounded w-1/3 animate-pulse"></div>
        <div className="h-4 bg-gray-100 rounded w-1/4 animate-pulse"></div>
      </CardFooter>
    </Card>
  )
}

