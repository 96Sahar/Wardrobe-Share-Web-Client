import React, { useEffect, useState } from "react";
import ProductGrid from "../../Feed/FeedComponents/ProductGrid";
import Jeans from "../../../assets/JeansDummyPic.jpg";

interface Product {
  id: number;
  name: string;
  image: string;
  city: string;
  category: string;
}

const Grid: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState("All");

  const dummyProd: Product[] = Array.from({ length: 32 }, (_, i) => ({
    id: i + 1,
    name: `Sustainable ${i % 2 === 0 ? "Cotton" : "Linen"} ${
      ["Shirt", "Pants", "Dress", "Jacket"][i % 4]
    }`,
    image: Jeans,
    city: "New York",
    category: "Tops",
  }));

  const [filteredProducts] = useState(dummyProd);
  const [groupedProducts, setGroupedProducts] = useState<
    Record<string, Product[]>
  >({});

  useEffect(() => {
    const grouped = filteredProducts.reduce((acc, product) => {
      if (!acc[product.category]) {
        acc[product.category] = [];
      }
      acc[product.category].push(product);
      return acc;
    }, {} as Record<string, Product[]>);
    setGroupedProducts(grouped);
  }, [filteredProducts]);

  return (
    <div className="min-h-screen bg-background">
      {/* Filter controls */}
      <div className="px-4 mt-6 flex items-center space-x-8 max-w-7xl mx-auto">
        <div>
          <label
            htmlFor="region"
            className="block text-lg font-bold text-primary"
          >
            Filter by Region
          </label>
          <select
            id="region"
            className="mt-1 block w-full rounded-md text-lg order-gray-300 shadow-sm focus:border-primary focus:ring-primary p-1"
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
          >
            <option value="All">All Regions</option>
            <option value="HaMerkaz">HaMerkaz</option>
            <option value="Tel Aviv">Tel Aviv</option>
            <option value="HaDarom">HaDarom</option>
            <option value="Heifa">Heifa</option>
            <option value="HaTzafon">HaTzafon</option>
            <option value="Yerushalayim">Yerushalayim</option>
          </select>
        </div>
      </div>
      {Object.entries(groupedProducts).map(([category, products]) => (
        <ProductGrid
          key={category}
          category={category}
          products={products}
          isCategoryPage={true}
        />
      ))}
    </div>
  );
};

export default Grid;
