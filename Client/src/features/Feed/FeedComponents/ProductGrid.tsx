import React from "react";
import { Heart } from "lucide-react";
import Button from "../../../utils/UtilsComponents/Button";

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
}

interface ProductGridProps {
  category: string;
  products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ category, products }) => {
  return (
    <div className="bg-background py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-primary">{category}</h2>
          <Button>View All {category}</Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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
                </div>
                <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-white transition-colors">
                  <Heart className="w-4 h-4 text-primary" />
                </button>
              </div>
              <h3 className="font-medium text-primary mb-1 group-hover:text-secondary transition-colors">
                {product.name}
              </h3>
              <p className="text-primary/60 font-medium">
                ${product.price.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
