import React, { useState } from "react";

interface FilterSectionProps {
  filters: {
    departments: string[];
    areasOfInterest: string[];
  };
  onFilterChange: (updatedFilters: {
    departments: string[];
    areasOfInterest: string[];
  }) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const departmentsList = [ "Computer",
  "Data Science",
  "AIML",
  "E&TC",
  "Mechanical",
  "Electrical",
  "AIDS",
  "IT"];
const areasOfInterestList = ['Frontend Developer',
'Backend Developer',
'Full Stack Developer',
'Mobile App Developer',
'Data Scientist',
'Web Developer',
'UI/UX Designer',
'QA Engineer (Quality Assurance)',
'DevOps Engineer',
'Game Developer',
'Cybersecurity Engineer',
'Cloud Developer',
'Machine Learning Engineer',
'API Developer',];

const FilterSection: React.FC<FilterSectionProps> = ({
  filters,
  onFilterChange,
  searchQuery,
  setSearchQuery,
}) => {
  const [isDepartmentOpen, setIsDepartmentOpen] = useState(false);
  const [isAreaOfInterestOpen, setIsAreaOfInterestOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(true);

  const handleCheckboxChange = (category: "departments" | "areasOfInterest", value: string) => {
    const updatedFilters = { ...filters };

    if (updatedFilters[category].includes(value)) {
      updatedFilters[category] = updatedFilters[category].filter((item) => item !== value);
    } else {
      updatedFilters[category].push(value);
    }

    onFilterChange(updatedFilters);
  };

  const handleClearFilters = () => {
    onFilterChange({
      departments: [],
      areasOfInterest: [],
    });
    setSearchQuery("");
  };

  const renderCheckboxes = (category: "departments" | "areasOfInterest", options: string[]) => (
    <div className="mb-4">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() =>
          category === "departments"
            ? setIsDepartmentOpen(!isDepartmentOpen)
            : setIsAreaOfInterestOpen(!isAreaOfInterestOpen)
        }
      >
        <label className="block text-neutral-600 dark:text-neutral-400 mb-1 capitalize">
          {category === "departments" ? "Department" : "Area of Interest"}
        </label>
        <span className="text-neutral-600 dark:text-neutral-400">
          {category === "departments" ? (isDepartmentOpen ? "▼" : "►") : isAreaOfInterestOpen ? "▼" : "►"}
        </span>
      </div>
      {(category === "departments" && isDepartmentOpen) || (category === "areasOfInterest" && isAreaOfInterestOpen) ? (
        options.map((option) => (
          <div key={option} className="flex items-center mb-2">
            <input
              type="checkbox"
              id={option}
              checked={filters[category].includes(option)}
              onChange={() => handleCheckboxChange(category, option)}
              className="mr-2"
            />
            <label htmlFor={option} className="text-neutral-800 dark:text-neutral-200">
              {option}
            </label>
          </div>
        ))
      ) : null}
    </div>
  );

  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg shadow-md w-full">
      <button
        className="w-full text-left px-4 py-2 text-lg font-semibold text-neutral-800 dark:text-neutral-200 bg-gray-100 dark:bg-neutral-800"
        onClick={() => setIsFilterOpen(!isFilterOpen)}
      >
        Filters {isFilterOpen ? "▲" : "▼"}
      </button>
      {isFilterOpen && (
        <div className="p-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name"
            className="w-full mb-4 px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg"
          />
          {renderCheckboxes("departments", departmentsList)}
          {renderCheckboxes("areasOfInterest", areasOfInterestList)}
          <button
            onClick={handleClearFilters}
            className="w-full mt-4 text-sm text-blue-500 dark:text-blue-400 hover:underline"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterSection;
