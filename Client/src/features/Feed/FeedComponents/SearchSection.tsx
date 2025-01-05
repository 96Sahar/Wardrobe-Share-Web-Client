import React, { useState } from "react";
import { Search } from "lucide-react";
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
    <div className="relative h-[500px] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${SearchBarBackground})`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 text-center">
          Discover Sustainable Fashion
        </h1>
        <p className="text-white/90 text-lg mb-8 text-center max-w-2xl">
          Join our community of conscious fashion lovers and find your next
          favorite piece
        </p>
        <div className="relative w-full max-w-xl">
          <input
            type="text"
            placeholder="Search for clothes, accessories, and more..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full pl-12 pr-4 py-6 rounded-full bg-white/95 backdrop-blur-sm border-0 shadow-lg focus:ring-2 focus:ring-secondary/50 transition-all"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary/60 w-5 h-5" />
        </div>
      </div>
    </div>
  );
};

export default SearchSection;
