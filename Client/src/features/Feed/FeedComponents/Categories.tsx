import React from "react";
import { IconType } from "react-icons";
import {
  FaTshirt,
  FaShoePrints,
  FaHatCowboy,
  FaSocks,
  FaGlasses,
  FaEllipsisH,
} from "react-icons/fa";

interface Category {
  icon: IconType;
  name: string;
}

const categories: Category[] = [
  { icon: FaTshirt, name: "Clothes" },
  { icon: FaShoePrints, name: "Shoes" },
  { icon: FaHatCowboy, name: "Hats" },
  { icon: FaSocks, name: "Socks" },
  { icon: FaGlasses, name: "Accessories" },
  { icon: FaEllipsisH, name: "More" },
];

const Categories: React.FC = () => {
  return (
    <div className="p-4 border-t border-b border-slate-300">
      <h2 className="text-xl font-semibold mb-4 text-slate-700">Categories</h2>
      <div className="flex justify-between">
        {categories.map((category, index) => {
          const Icon = category.icon;
          return (
            <div key={index} className="flex flex-col items-center space-y-2">
              <div className="w-14 h-14 rounded-full bg-slate-700 flex items-center justify-center">
                <Icon className="text-white text-xl" />
              </div>
              <span className="text-sm text-slate-700">{category.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;
