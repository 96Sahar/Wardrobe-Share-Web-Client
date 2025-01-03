import { useState } from "react";
import {
  FaSearch,
  FaTshirt,
  FaShoePrints,
  FaHatCowboy,
  FaSocks,
  FaGlasses,
  FaEllipsisH,
} from "react-icons/fa";
import Header from "../../utils/Components/Header";

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
}

const Feed = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Dummy data for demonstration
  const categories = [
    { icon: FaTshirt, name: "Clothes" },
    { icon: FaShoePrints, name: "Shoes" },
    { icon: FaHatCowboy, name: "Hats" },
    { icon: FaSocks, name: "Socks" },
    { icon: FaGlasses, name: "Accessories" },
    { icon: FaEllipsisH, name: "More" },
  ];

  const dummyProducts: Product[] = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    image: "/placeholder.svg",
    price: 29.99 + i,
  }));

  return (
    <div>
      <Header />

      {/* Search Section */}
      <div className="p-4 space-y-4 flex flex-col items-center justify-center h-[400px]">
        <h1 className="text-2xl font-semibold text-slate-700">
          Find something new
        </h1>
        <div className="relative w-1/4">
          <input
            type="text"
            placeholder="Search products"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-3 pl-10 border border-slate-700 rounded-full"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-700" />
        </div>
      </div>

      {/* Categories */}
      <div className="p-4 border-t border-b border-slate-700">
        <h2 className="text-xl font-semibold mb-4 text-slate-700">
          Categories
        </h2>
        <div className="flex justify-between">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div key={index} className="flex flex-col items-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center">
                  <Icon className="text-white text-xl" />
                </div>
                <span className="text-sm text-slate-700">{category.name}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Products Grid */}
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4 text-slate-700">
          All Products
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {dummyProducts.map((product) => (
            <div
              key={product.id}
              className="border border-slate-700 rounded-lg p-2 space-y-2"
            >
              <div className="aspect-square bg-slate-200 rounded-lg" />
              <h3 className="font-medium text-slate-700">{product.name}</h3>
              <p className="text-slate-700">${product.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feed;
