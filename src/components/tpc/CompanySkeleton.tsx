import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function CompanySkeleton() {
  return (
    <div className="container mx-auto p-6 space-y-8">
      <Skeleton className="h-6 w-40" />
      <div className="grid gap-8 md:grid-cols-3">
        <Card className="md:col-span-2 bg-white shadow-lg">
          <CardHeader>
            <Skeleton className="h-8 w-3/4" />
          </CardHeader>
          <CardContent className="space-y-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-6 w-full" />
            ))}
          </CardContent>
        </Card>
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <Skeleton className="h-6 w-1/2" />
          </CardHeader>
          <CardContent className="space-y-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className="h-6 w-full" />
            ))}
          </CardContent>
        </Card>
      </div>
      <Card className="bg-white shadow-lg">
        <CardHeader>
          <Skeleton className="h-6 w-1/2" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-10 w-full mb-4" />
          <Skeleton className="h-64 w-full" />
        </CardContent>
      </Card>
    </div>
  )
}

