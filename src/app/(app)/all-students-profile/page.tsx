'use client';

import React, { useState, useEffect } from "react";
import { StudentsCards } from "@/components/student/StudentsCards";
import StudentCardSkeleton from "@/components/student/StudentCardSkeleton";
import FilterSection from "@/components/student/FilterSection";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/base/select/select";

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

interface YearOption {
  label: string;
  id: string;
  // supportingText: string;
  value: string;
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
  const [selectedYear, setSelectedYear] = useState<string>("2025"); // Default to 2025

  // Generate year options (past years + 2025)
  const generateYearOptions = (): YearOption[] => {
    const currentYear = new Date().getFullYear();
    const years: YearOption[] = [];
    
    // Add past years (from current year descending)
    for (let year = currentYear; year >= currentYear - 8; year--) {
      years.push({
        label: year.toString(),
        id: year.toString(),
        // supportingText: `${year}`,
        value: year.toString()
      });
    }
    
    // Add 2025 if not already included
    if (!years.some(y => y.value === "2025")) {
      years.unshift({
        label: "2025",
        id: "2025",
    
        value: "2025"
      });
    }
    
    return years;
  };

  const yearOptions = generateYearOptions();

  const fetchStudents = async (year: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`/api/fetch-all-students?year=${year}`);
      setStudentsData(response.data.users || []);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.message || "Error fetching data");
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents(selectedYear);
  }, [selectedYear]);

  const handleYearChange = (key: React.Key | null) => {
    if (typeof key === "string") {
      setSelectedYear(key);
    }
  };

  const filteredStudents = studentsData.filter(
    (student) =>
      `${student.firstName} ${student.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (filters.departments.length === 0 || filters.departments.includes(student.department)) &&
      (filters.areasOfInterest.length === 0 || filters.areasOfInterest.includes(student.areaOfInterest))
  );

  return (
    <div className="min-h-screen relative">
      <div className="w-full px-4 py-8">
        {/* Your existing header */}
        <div className="mb-8 mt-5">
          <h4 className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium text-[#244855]">
            Explore Your Peers
          </h4>
          <p className="text-sm lg:text-base max-w-2xl my-4 mx-auto text-[#90AEAD] text-center font-normal">
            Discover and connect with fellow students by browsing detailed profiles.
          </p>
        </div>

        {/* Year Selector - Added above your existing UI */}
        <div className="absolute end-20 top-28">
          <Select
            isRequired
            tooltip="Filter by passout year"
            placeholder="Select passout year"
            items={yearOptions}
            className="text-[#E64833] border-[#E64833] border-2 rounded-xl"
            selectedKey={selectedYear}
            onSelectionChange={handleYearChange}
          >
            {(item) => (
              <Select.Item 
                id={item.id} 
                supportingText={item.supportingText}
              >
                {item.label}
              </Select.Item>
            )}
          </Select>
        </div>

        {/* Your existing filter and student cards UI */}
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