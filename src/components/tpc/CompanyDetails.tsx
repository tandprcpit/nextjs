import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Banknote, FileText } from 'lucide-react'

interface CompanyDetailsProps {
  name: string
  description: string
  location: string
  salary: number
  bond: string
}

export function CompanyDetails({ name, description, location, salary, bond }: CompanyDetailsProps) {
  return (
    <Card className="md:col-span-2 bg-white shadow-lg">
      <CardHeader className="border-b border-gray-200">
        <CardTitle className="text-3xl font-bold text-[#244855]">{name}</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-[#E64833]" />
            <span className="text-gray-700">{location}</span>
          </div>
          <div className="flex items-center">
            <Banknote className="w-5 h-5 mr-2 text-[#E64833]" />
            <span className="text-gray-700">₹{salary} LPA</span>
          </div>
          <div className="flex items-center">
            <FileText className="w-5 h-5 mr-2 text-[#E64833]" />
            <span className="text-gray-700">Bond: {bond}</span>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-[#244855] mb-2">Description</h3>
          <p
            className="text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: description }}
          ></p>

        </div>
      </CardContent>
    </Card>
  )
}

