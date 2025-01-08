import React, { useState } from "react";
import Button from "../../../utils/UtilsComponents/Button";

interface Product {
  id: number;
  name: string;
  image: string;
  city: string;
}

interface ProductGridProps {
  category: string;
  products: Product[];
  isCategoryPage?: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({ category, products, isCategoryPage}) => {
  const [likedProducts, setLikedProducts] = useState<{
    [key: number]: boolean;
  }>({});

  const handleLike = (productId: number) => {
    setLikedProducts((prev) => ({
      ...prev,
      [productId]: !prev[productId], // Toggle the like state for the given product
    }));
  };

  return (
    <div className="bg-background py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-primary">{category}</h2>
          {!isCategoryPage && <Button>View All {category}</Button>}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-surface rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="relative">
                <div className="aspect-square bg-background rounded-xl overflow-hidden mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transform transition-transform group-hover:scale-105"
                  />
                  {/* Like Button */}
                  <button
                    onClick={() => handleLike(product.id)}
                    className={`absolute top-4 right-4 p-2 rounded-full shadow-md ${
                      likedProducts[product.id]
                        ? "bg-red-500 text-white"
                        : "bg-gray-100 text-gray-800"
                    } hover:bg-red-500 hover:text-white transition-colors`}
                  >
                    {likedProducts[product.id] ? "❤️" : "🤍"}
                  </button>
                </div>
              </div>
              <h3 className="font-medium text-primary mb-1 group-hover:text-secondary transition-colors">
                {product.name}
              </h3>
              <p className="text-primary/60 font-medium">{product.city}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
