import React from "react";

const SearchInput = ({ searchQuery, setSearchQuery }:any) => {
  return (
    <input
      type="text"
      placeholder="Search students..."
      className="w-full p-2 border rounded-md bg-gray-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  );
};

export default SearchInput;
