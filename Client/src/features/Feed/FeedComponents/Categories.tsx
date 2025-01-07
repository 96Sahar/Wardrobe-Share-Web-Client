import React from "react";
import Shirt from "../../../assets/Clothes-Icon/shirt.png";
import Jeans from "../../../assets/Clothes-Icon/jeans.png";
import Dress from "../../../assets/Clothes-Icon/dress.png";
import Jacket from "../../../assets/Clothes-Icon/jacket.png";
import Pajama from "../../../assets/Clothes-Icon/pajamas.png";
import Accessories from "../../../assets/Clothes-Icon/bags.png";
import Bikini from "../../../assets/Clothes-Icon/bikini.png";
import Button from "../../../utils/UtilsComponents/Button";

interface Category {
  icon: string;
  name: string;
}

const categories: Category[] = [
  { icon: Shirt, name: "Tops" },
  { icon: Jeans, name: "Bottoms" },
  { icon: Dress, name: "Dresses" },
  { icon: Jacket, name: "Outerwear" },
  { icon: Pajama, name: "Sleepwear" },
  { icon: Bikini, name: "Swimwear" },
  { icon: Accessories, name: "Accessories" },
];

const Categories: React.FC = () => {
  return (
    <div className="bg-surface py-12 px-4 border-b border-slate-700">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-primary">Browse Categories</h2>
          <Button>View All Items</Button>
        </div>
        <div className="flex flex-wrap justify-between items-center gap-4">
          {categories.map((category, index) => (
            <button
              key={index}
              className="group flex flex-col items-center space-y-3 transition-transform hover:scale-105"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg transform transition-all duration-300 group-hover:shadow-xl">
                <img
                  src={category.icon}
                  alt={category.name}
                  className="w-8 h-8 object-cover"
                />
              </div>
              <span className="text-sm font-medium text-primary/80 group-hover:text-primary">
                {category.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
