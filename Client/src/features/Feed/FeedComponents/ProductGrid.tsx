import React from "react";

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
}

interface ProductGridProps {
  products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4 text-slate-700">
        All Products
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="border border-slate-300 rounded-lg p-2 space-y-2"
          >
            <div className="aspect-square bg-slate-200 rounded-lg" />
            <h3 className="font-medium text-slate-700">{product.name}</h3>
            <p className="text-slate-700">${product.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
