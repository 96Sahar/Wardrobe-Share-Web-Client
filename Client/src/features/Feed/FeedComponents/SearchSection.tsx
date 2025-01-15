import React, { useState } from "react";
import { Search } from "lucide-react";
import SearchBarBackground from "../../../assets/SearchBarBackground.jpg";
import { useNavigate } from "react-router-dom";



const SearchSection: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);

  const categories = [
    "Tops (shirts, blouses, T-shirts, tank tops)",
    "Bottoms (pants, jeans, skirts, shorts)",
    "Dresses (casual, formal, maxi, mini)",
    "Outerwear (jackets, coats, cardigans)",
    "Activewear (leggings, sports bras, tracksuits)",
    "Sleepwear (pajamas, nightgowns, robes)",
    "Swimwear (bikinis, one-pieces, trunks)",
    "Footwear (sneakers, sandals, boots, heels, flats)",
    "Accessories (bags, hats, belts, scarves)",
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query) {
      const filtered = categories
        .filter((category) =>
          category.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 2);
      setFilteredOptions(filtered);
    } else {
      setFilteredOptions([]);
    }
  };

  const handleOptionSelect = (option: string) => {
    const simplifiedCategory = option.split(" ")[0];
    simplifiedCategory.toLowerCase();
    navigate(`/categoryPage/${simplifiedCategory}`);
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
          {filteredOptions.length > 0 && (
            <ul
              className="absolute left-0 top-full mt-2 w-full bg-white/95 rounded-lg shadow-lg max-h-60 overflow-y-auto"
              style={{
                zIndex: 20, // Ensures dropdown covers the next component
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              {filteredOptions.map((option, index) => (
                <li
                  key={index}
                  className="p-4 text-gray-800 hover:bg-gray-300 cursor-pointer"
                  onClick={() => handleOptionSelect(option)}
                >
                  {option}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      {/* Dummy Next Component */}
      <div className="relative z-0 bg-gray-100 h-[500px] flex items-center justify-center">
        <p className="text-gray-700">
          This is the next component below the search section.
        </p>
      </div>
    </div>
  );
};

export default SearchSection;
