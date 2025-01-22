import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button"; // Assuming you have a Button component
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { Card} from "@/components/ui/card";
import { useRouter } from "next/navigation";

interface Student {
  username: string;
  firstName: string;
  lastName: string;
  image: string;
  department: string;
  passoutYear: number;
  areaOfInterest: string;
  linkedinLink: string;
  githubLink: string;
  leetcodeLink: string;
}

interface StudentsCardsProps {
  student: Student;
}

export function StudentsCards({ student }: StudentsCardsProps) {
  const router = useRouter();

  const handleVisitProfile = () => {
    router.replace(`/other-student-profile/${student.username}`);
  };

  return (
    <Card className="w-64 bg-white shadow-lg mt-20 rounded-lg relative">
     
      <div className="h-24 bg-[#244855]" /> 

   
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-hidden">
        <Image
          src={student.image || "/image.png"}
          alt={`${student.firstName} ${student.lastName}'s profile`}
          width={120}
          height={120}
          className="w-[120px] h-[120px] rounded-lg border-4 border-white object-cover"
        />
      </div>

      <div className="pt-4 pb-4 px-4">
        <h2 className="text-xl font-bold text-center mt-2 mb-1 text-[#244855] dark:text-[#FBE9D0]">
          {student.firstName} {student.lastName}
        </h2>
        <p className="text-sm text-gray-600 text-center mb-3">
          {student.department}
        </p>

        <p className="text-sm text-center mb-2">
          <span className="font-semibold">Pass out Year:</span> {student.passoutYear}
        </p>

        <p className="text-sm text-center mb-2">
          <span className="font-semibold">Area of Interest:</span> {student.areaOfInterest}
        </p>

       
        <div className="flex space-x-4 mb-4 justify-center">
          {student.linkedinLink && (
            <a
              href={student.linkedinLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#244855] hover:text-[#874F41] dark:text-blue-400 dark:hover:text-blue-300"
            >
              <FaLinkedin className="w-6 h-6" />
            </a>
          )}
          {student.githubLink && (
            <a
              href={student.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#244855] hover:text-[#874F41] dark:text-gray-300 dark:hover:text-gray-100"
            >
              <FaGithub className="w-6 h-6" />
            </a>
          )}
          {student.leetcodeLink && (
            <a
              href={student.leetcodeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#E64833] hover:text-[#874F41] dark:text-orange-400 dark:hover:text-orange-300"
            >
              <SiLeetcode className="w-6 h-6" />
            </a>
          )}
        </div>

      
        <Button 
          onClick={handleVisitProfile} 
          className="w-full bg-[#E64833] hover:bg-[#874F41] text-white transition-colors duration-300"
        >
          Visit Full Profile
        </Button>
      </div>
    </Card>
  );
}
