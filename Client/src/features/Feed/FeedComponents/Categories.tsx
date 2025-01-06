import React from "react";
import { IconType } from "react-icons";
import {
  FaTshirt as Shirt,
  FaShoePrints as Footprints,
  FaHardHat as Hat,
  FaSocks as Sock,
  FaGlasses as Glasses,
  FaEllipsisH as MoreHorizontal,
} from "react-icons/fa";

interface Category {
  icon: IconType;
  name: string;
}

const categories: Category[] = [
  { icon: Shirt, name: "Clothes" },
  { icon: Footprints, name: "Shoes" },
  { icon: Hat, name: "Hats" },
  { icon: Sock, name: "Socks" },
  { icon: Glasses, name: "Accessories" },
  { icon: MoreHorizontal, name: "More" },
];

const Categories: React.FC = () => {
  return (
    <div className="bg-surface py-12 px-4 border border-b border-slate-700">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-primary mb-8">
          Browse Categories
        </h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <button
                key={index}
                className="group flex flex-col items-center space-y-3 transition-transform hover:scale-105"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg transform transition-all duration-300 group-hover:shadow-xl">
                  <Icon className="text-white w-8 h-8 transform transition-transform group-hover:scale-110" />
                </div>
                <span className="text-sm font-medium text-primary/80 group-hover:text-primary">
                  {category.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Categories;
