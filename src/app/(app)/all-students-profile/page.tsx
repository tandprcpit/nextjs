'use client';

import React, { useState, useEffect } from "react";
import { StudentsCards } from "@/components/student/StudentsCards";
import StudentCardSkeleton from "@/components/student/StudentCardSkeleton";
import FilterSection from "@/components/student/FilterSection";
import axios from "axios";
import { Button } from "@/components/ui/button";


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

interface Filters {
  departments: string[];
  areasOfInterest: string[];
}

const Page: React.FC = () => {
  const [studentsData, setStudentsData] = useState<Student[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filters, setFilters] = useState<Filters>({
    departments: [],
    areasOfInterest: [],
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState<boolean>(false);

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get('/api/fetch-all-students');
        setStudentsData(response.data.users || []);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.response?.data.message || "An error occurred while fetching data");
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const filteredStudents = studentsData.filter(
    (student) =>
      `${student.firstName} ${student.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (filters.departments.length === 0 || filters.departments.includes(student.department)) &&
      (filters.areasOfInterest.length === 0 || filters.areasOfInterest.includes(student.areaOfInterest))
  );

  return (
    <div className="min-h-screen ">
      <div className="w-full px-4 py-8">
        <div className="mb-8 mt-5">
          <h4 className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium text-[#244855]">
            Explore Your Peers
          </h4>
          <p className="text-sm lg:text-base max-w-2xl my-4 mx-auto text-[#90AEAD] text-center font-normal">
            Discover and connect with fellow students by browsing detailed profiles. Use filters to search by department and areas of interest, and explore the skills, projects, and achievements of your classmates
          </p>
        </div>

        <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
          <div className={`flex flex-col dark:bg-neutral-700 p-4 rounded`}>
            <Button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 bg-[#E64833] hover:bg-[#874F41] text-white mb-4"
            >

              <span className="text-sm">Filter</span>
            </Button>

            {showFilters && (
              <FilterSection
                filters={filters}
                onFilterChange={setFilters}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            )}
          </div>

          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
              {loading ? (
                Array.from({ length: 8 }).map((_, index) => (
                  <StudentCardSkeleton key={index} />
                ))
              ) : error ? (
                <p className="text-red-500 col-span-full">{error}</p>
              ) : filteredStudents.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 col-span-full text-center">
                  No students found matching the current filters.
                </p>
              ) : (
                filteredStudents.map((student) => (
                  <StudentsCards key={student.username} student={student} />
                ))
              )}
            </div>
          </div>



        </div>
      </div>
    </div>
  );
};

export default Page;
