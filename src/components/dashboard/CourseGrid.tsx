import { Card, CardContent } from '@/components/ui/card'
import { ChevronRight } from 'lucide-react'
import Image from 'next/image'

interface Course {
  title: string
  src: string
  description: string
}

interface CourseGridProps {
  courses: Course[]
}

export function CourseGrid({ courses }: CourseGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {courses.map((course) => (
        <Card 
          key={course.title} 
          className="group overflow-hidden h-full shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        >
          <div className="relative h-48 overflow-hidden">
            <Image
              src={course.src}
              alt={course.title}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
          </div>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-2 text-gray-800 group-hover:text-[#E64833] transition-colors duration-300">{course.title}</h3>
            <p className="text-gray-600 mb-4 line-clamp-3">{course.description}</p>
            <div className="flex items-center text-[#E64833] font-medium transition-all duration-300 group-hover:translate-x-2">
              Learn More
              <ChevronRight className="ml-1 w-4 h-4" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
