import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { FaGithub, FaLinkedin, FaInstagram, FaTwitter, FaEnvelope, FaPhone, FaFileAlt, FaLink } from 'react-icons/fa'
import { SiLeetcode, SiGeeksforgeeks, SiCodechef, SiHackerrank } from 'react-icons/si'

interface StudentData {
  firstName: string
  lastName: string
  middleName?: string
  image?: string
  areaOfInterest?: string
  department?: string
  aboutYou?: string
  skills?: string[]
  email?: string
  mobileNumber?: string
  resumeLink?: string
  personalPortfolioLink?: string
  githubLink?: string
  linkedinLink?: string
  instagramLink?: string
  twitterLink?: string
  leetcodeLink?: string
  hackerRankLink?: string
  codechefLink?: string
  geeksForGeeksLink?: string
  projectTitle1?: string
  projectDescription1?: string
  projectLink1?: string
  projectTitle2?: string
  projectDescription2?: string
  projectLink2?: string
}

interface StudentProfileProps {
  studentData: StudentData | null
  loading: boolean
}

export function StudentProfile({ studentData, loading }: StudentProfileProps) {
  if (loading) {
    return (
      <Card className="w-full max-w-4xl mx-auto mt-28">
        <CardHeader className="relative pb-0">
          <div className="absolute -top-24 left-1/2 transform -translate-x-1/2">
            <Skeleton className="w-48 h-48 rounded-full" />
          </div>
        </CardHeader>
        <CardContent className="pt-28">
          <div className="text-center mb-6">
            <Skeleton className="h-8 w-64 mx-auto mb-2" />
            <Skeleton className="h-6 w-48 mx-auto mb-2" />
            <Skeleton className="h-4 w-32 mx-auto" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </CardContent>
        <CardFooter className="flex justify-center space-x-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="w-8 h-8 rounded-full" />
          ))}
        </CardFooter>
      </Card>
    )
  }

  if (!studentData) {
    return <p className="text-center text-2xl mt-10">No student data available</p>
  }

  return (
    <Card className="w-full max-w-6xl mx-auto bg-white mt-28 mb-10">
    <CardHeader className="relative pb-0">
        <div className="absolute -top-24 left-1/2 transform -translate-x-1/2">
            <Avatar className="w-48 h-48 border-4 border-white shadow-lg">
                <AvatarImage src={studentData.image || "/placeholder-avatar.png"} alt={`${studentData.firstName} ${studentData.lastName}`} />
                <AvatarFallback className="text-4xl">{studentData.firstName.charAt(0)}{studentData.lastName.charAt(0)}</AvatarFallback>
            </Avatar>
        </div>
    </CardHeader>

    <CardContent className="pt-28">
        <div className="text-center mb-10">
            <CardTitle className="text-4xl font-bold text-[#244855] mb-2">{studentData.firstName} {studentData.middleName} {studentData.lastName}</CardTitle>
            <CardDescription className="text-2xl text-[#874F41] mb-2">{studentData.areaOfInterest || "Area of Interest"}</CardDescription>
            <p className="text-xl text-muted-foreground">{studentData.department || "Department"}</p>
        </div>
        <CardFooter className="flex justify-center flex-wrap gap-4 mt-10">
            {studentData.githubLink && (
                <Button variant="outline" size="icon" className="rounded-full w-10 h-10 sm:w-12 sm:h-12 border-[#244855]" asChild>
                    <a href={studentData.githubLink} target="_blank" rel="noopener noreferrer">
                        <FaGithub className="h-5 w-5 sm:h-6 sm:w-6 text-[#181717]" />
                    </a>
                </Button>
            )}
            {studentData.linkedinLink && (
                <Button variant="outline" size="icon" className="rounded-full w-10 h-10 sm:w-12 sm:h-12 border-[#244855]" asChild>
                    <a href={studentData.linkedinLink} target="_blank" rel="noopener noreferrer">
                        <FaLinkedin className="h-5 w-5 sm:h-6 sm:w-6 text-[#0A66C2]" />
                    </a>
                </Button>
            )}
            {studentData.instagramLink && (
                <Button variant="outline" size="icon" className="rounded-full w-10 h-10 sm:w-12 sm:h-12 border-[#244855]" asChild>
                    <a href={studentData.instagramLink} target="_blank" rel="noopener noreferrer">
                        <FaInstagram className="h-5 w-5 sm:h-6 sm:w-6 text-[#E4405F]" />
                    </a>
                </Button>
            )}
            {studentData.twitterLink && (
                <Button variant="outline" size="icon" className="rounded-full w-10 h-10 sm:w-12 sm:h-12 border-[#244855]" asChild>
                    <a href={studentData.twitterLink} target="_blank" rel="noopener noreferrer">
                        <FaTwitter className="h-5 w-5 sm:h-6 sm:w-6 text-[#1DA1F2]" />
                    </a>
                </Button>
            )}
            {studentData.leetcodeLink && (
                <Button variant="outline" size="icon" className="rounded-full w-10 h-10 sm:w-12 sm:h-12 border-[#244855]" asChild>
                    <a href={studentData.leetcodeLink} target="_blank" rel="noopener noreferrer">
                        <SiLeetcode className="h-5 w-5 sm:h-6 sm:w-6 text-[#FFA116]" />
                    </a>
                </Button>
            )}
            {studentData.hackerRankLink && (
                <Button variant="outline" size="icon" className="rounded-full w-10 h-10 sm:w-12 sm:h-12 border-[#244855]" asChild>
                    <a href={studentData.hackerRankLink} target="_blank" rel="noopener noreferrer">
                        <SiHackerrank className="h-5 w-5 sm:h-6 sm:w-6 text-[#00EA64]" />
                    </a>
                </Button>
            )}
            {studentData.codechefLink && (
                <Button variant="outline" size="icon" className="rounded-full w-10 h-10 sm:w-12 sm:h-12 border-[#244855]" asChild>
                    <a href={studentData.codechefLink} target="_blank" rel="noopener noreferrer">
                        <SiCodechef className="h-5 w-5 sm:h-6 sm:w-6 text-[#5B4638]" />
                    </a>
                </Button>
            )}
            {studentData.geeksForGeeksLink && (
                <Button variant="outline" size="icon" className="rounded-full w-10 h-10 sm:w-12 sm:h-12 border-[#244855]" asChild>
                    <a href={studentData.geeksForGeeksLink} target="_blank" rel="noopener noreferrer">
                        <SiGeeksforgeeks className="h-5 w-5 sm:h-6 sm:w-6 text-[#0F9D58]" />
                    </a>
                </Button>
            )}
        </CardFooter>
        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-[#244855] to-transparent h-[1px] my-8 w-full" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-8">
                <div>
                    <h3 className="text-2xl font-semibold text-[#244855] mb-4">About Me</h3>
                    <p className="text-lg text-muted-foreground leading-relaxed">{studentData.aboutYou || "No bio available."}</p>
                </div>
                <div>
                    <h3 className="text-2xl font-semibold text-[#244855] mb-4">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                        {studentData.skills && studentData.skills.length > 0 ? (
                            studentData.skills.map((skill: string) => (
                                <Badge
                                    key={skill}
                                    variant="secondary"
                                    className="text-lg py-1 px-3 bg-[#244855] text-white hover:bg-[#90AEAD]"
                                >
                                    {skill}
                                </Badge>
                            ))
                        ) : (
                            <p className="text-lg text-muted-foreground">No skills available.</p>
                        )}
                    </div>
                </div>

                <div className="mt-10">
                    <h3 className="text-2xl font-semibold text-[#244855] mb-4">Contact</h3>
                    <div className="flex flex-wrap gap-4">
                        <Button
                            variant="outline"
                            size="lg"
                            className="flex items-center space-x-2 border-[#E64833] text-[#244855]"
                        >
                            <FaEnvelope className="h-5 w-5" />
                            <span>{studentData.email}</span>
                        </Button>

                        <Button
                            variant="outline"
                            size="lg"
                            className="flex items-center space-x-2 border-[#E64833] text-[#244855]"
                        >
                            <FaPhone className="h-5 w-5" />
                            <span>+91 {studentData.mobileNumber}</span>
                        </Button>
                        
                        <Button
                            variant="outline"
                            size="lg"
                            className="flex items-center space-x-2 border-[#E64833] text-[#244855]"
                            asChild
                        >
                            <a href={studentData.resumeLink} target="_blank" rel="noopener noreferrer">
                                <FaFileAlt className="h-5 w-5" />
                                <span>View Resume</span>
                            </a>
                        </Button>

                     

                        {studentData.personalPortfolioLink && (
                            <Button
                                variant="outline"
                                size="lg"
                                className="flex items-center space-x-2 border-[#E64833] text-[#244855]"
                                asChild
                            >
                                <a href={studentData.personalPortfolioLink} target="_blank" rel="noopener noreferrer">
                                    <FaLink className="h-5 w-5" />
                                    <span>View Portfolio</span>
                                </a>
                            </Button>
                        )}
                    </div>
                </div>

            </div>
            <div className="space-y-8">
                <div>
                    <h3 className="text-2xl font-semibold text-[#244855] mb-4">Projects</h3>
                    <div className="space-y-6">
                        <Card className="bg-[#90AEAD] dark:bg-gray-800/50 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-xl text-[#244855]">{studentData.projectTitle1}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-[#244855]">{studentData.projectDescription1}</p>
                            </CardContent>
                            <CardFooter>
                                <Button variant="outline" className="border-[#E64833]" asChild>
                                    <a href={studentData.projectLink1} target="_blank" rel="noopener noreferrer">Explore Project</a>
                                </Button>
                            </CardFooter>
                        </Card>
                        <Card className="bg-[#90AEAD] dark:bg-gray-800/50 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-xl text-[#244855]">{studentData.projectTitle2}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-[#244855]">{studentData.projectDescription2}</p>
                            </CardContent>
                            <CardFooter>
                                <Button variant="outline" className="border-[#E64833]" asChild>
                                    <a href={studentData.projectLink2} target="_blank" rel="noopener noreferrer">Explore Project</a>
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    </CardContent>


</Card>
  )
}

