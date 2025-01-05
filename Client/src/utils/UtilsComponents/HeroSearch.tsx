"use client";

import { useState } from "react";
import { FiSearch, FiGrid, FiMic } from "react-icons/fi";

const HeroSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="relative h-[400px] w-full bg-hero bg-cover bg-center">
      <div className="absolute inset-0 bg-black/30" /> {/* Overlay */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4">
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            חדש: חוויית חיפוש משודרגת
          </h1>
          <p className="text-xl text-white/90 md:text-2xl">
            קל יותר למכור, לקנות ולשמור על הסביבה
          </p>
        </div>
        <div className="w-full max-w-3xl">
          <div className="relative flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="מה תרצו לחפש?"
              className="h-14 w-full rounded-lg bg-white px-12 text-right text-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              dir="rtl"
            />
            <FiSearch className="absolute right-4 h-6 w-6 text-gray-400" />
            <FiMic className="absolute left-16 h-5 w-5 cursor-pointer text-gray-400 hover:text-gray-600" />
            <button className="absolute left-4 flex items-center space-x-2 text-gray-600">
              <FiGrid className="h-5 w-5" />
              <span>כל הקטגוריות</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSearch;
