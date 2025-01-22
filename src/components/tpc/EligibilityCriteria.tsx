import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, Users, Clock, Briefcase } from 'lucide-react'

interface EligibilityCriteriaProps {
  criteria: {
    overallCGPA: number
    gender: string[]
    passoutYear: number
    anyLiveKTs: string
    anyGapDuringEducation: string
    department: string[]
    tenthMarks: number
    twelfthPercentage: number
    diplomaPercentage: number
    skills: string[]
  }
}

export function EligibilityCriteria({ criteria }: EligibilityCriteriaProps) {
  return (
    <Card className="bg-white shadow-lg">
      <CardHeader className="border-b border-gray-200">
        <CardTitle className="text-2xl font-bold text-[#244855]">Eligibility Criteria</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <ScrollArea className="h-[calc(100vh-20rem)]">
          <div className="space-y-4">
            <div className="flex items-center">
              <GraduationCap className="w-5 h-5 mr-2 text-[#E64833]" />
              <span className="text-gray-700">overallCGPA: {criteria.overallCGPA}</span>
            </div>
            <div className="flex items-center">
              <Users className="w-5 h-5 mr-2 text-[#E64833]" />
              <span className="text-gray-700">Gender: {criteria.gender.join(', ')}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-2 text-[#E64833]" />
              <span className="text-gray-700">Passout Year: {criteria.passoutYear}</span>
            </div>
            <div className="flex items-center">
              <Briefcase className="w-5 h-5 mr-2 text-[#E64833]" />
              <span className="text-gray-700">Live KT: {criteria.anyLiveKTs}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-2 text-[#E64833]" />
              <span className="text-gray-700">Education Gap: {criteria.anyGapDuringEducation}</span>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-[#244855] mb-2">Departments</h4>
              <div className="flex flex-wrap gap-2">
                {criteria.department.map((dept) => (
                  <Badge key={dept} variant="secondary" className="bg-[#90AEAD] text-white">
                    {dept}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <span className="font-semibold text-[#244855]">10th Percentage: </span>
              <span className="text-gray-700">{criteria.tenthMarks}%</span>
            </div>
            <div>
              <span className="font-semibold text-[#244855]">12th Percentage: </span>
              <span className="text-gray-700">{criteria.twelfthPercentage}%</span>
            </div>
            <div>
              <span className="font-semibold text-[#244855]">Diploma Percentage: </span>
              <span className="text-gray-700">{criteria.diplomaPercentage}%</span>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-[#244855] mb-2">Required Skills</h4>
              <div className="flex flex-wrap gap-2">
                {criteria.skills.map((skill) => (
                  <Badge key={skill} variant="outline" className="border-[#E64833] text-[#E64833]">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

