import { useNavigate } from "react-router-dom";
import Shirt from "../../../assets/Clothes-Icon/shirt.png";
import Jeans from "../../../assets/Clothes-Icon/jeans.png";
import Dress from "../../../assets/Clothes-Icon/dress.png";
import Jacket from "../../../assets/Clothes-Icon/jacket.png";
import Pajama from "../../../assets/Clothes-Icon/pajamas.png";
import Accessories from "../../../assets/Clothes-Icon/accessories.png";
import Shoes from "../../../assets/Clothes-Icon/shoes.png";
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
  { icon: Shoes, name: "Footwear" },
  { icon: Accessories, name: "Accessories" },
];

const Categories: React.FC = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName: string = "") => {
    navigate(`/categoryPage/${categoryName}`);
  };

  return (
    <div className="bg-surface py-12 px-4 border-b border-slate-700">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col justify-between items-center mb-8 space-y-4 sm:flex-row sm:space-y-0">
          <h2 className="text-xl font-bold text-primary">Browse Categories</h2>
          <Button
            className="w-full sm:w-auto text-center"
            onClick={() => navigate("/categoryPage")}
          >
            View All Items
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 mid:grid-cols-4">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => handleCategoryClick(category.name)}
              className="group flex flex-col items-center space-y-2 sm:space-y-3 transition-transform hover:scale-105"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg transform transition-all duration-300">
                <img
                  src={category.icon}
                  alt={category.name}
                  className="w-8 h-8 object-cover"
                />
              </div>
              <span className="text-xs font-medium text-primary/80 group-hover:text-primary sm:text-sm group-hover:shadow-sm">
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
