import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import SearchBarBackground from "../../../assets/SearchBarBackground.jpg";

interface SearchSectionProps {
  onSearch: (query: string) => void;
}

const SearchSection: React.FC<SearchSectionProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <div
      className="p-4 space-y-4 flex flex-col items-center justify-center h-[400px] bg-center bg-no-repeat relative"
      style={{
        backgroundImage: `url(${SearchBarBackground})`,
        backgroundSize: "cover",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <h1 className="text-2xl font-semibold text-white relative z-10 bg-transparent">
        Find something new
      </h1>
      <div className="relative w-full max-w-md z-10 bg-transparent">
        <input
          type="text"
          placeholder="Search products"
          value={searchQuery}
          onChange={handleSearch}
          className="w-full p-3 pl-10 rounded-full bg-white bg-opacity-90 "
        />
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-700 bg-transparent" />
      </div>
    </div>
  );
};

export default SearchSection;
