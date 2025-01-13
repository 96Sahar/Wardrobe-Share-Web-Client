import React, { useState, useEffect } from "react";
import Header from "../../utils/UtilsComponents/Header";
import SearchSection from "./FeedComponents/SearchSection";
import Categories from "./FeedComponents/Categories";
import ProductGrid from "./FeedComponents/ProductGrid";
import Jeans from "../../assets/JeansDummyPic.jpg";

interface Product {
  id: number;
  name: string;
  image: string;
  city: string;
  category: string;
}

const Feed: React.FC = () => {
  // Define the dummy products inside the component
  const dummyProducts: Product[] = Array.from({ length: 32 }, (_, i) => ({
    id: i + 1,
    name: `Sustainable ${i % 2 === 0 ? "Cotton" : "Linen"} ${
      ["Shirt", "Pants", "Dress", "Jacket"][i % 4]
    }`,
    image: Jeans,
    city: "New York",
    category: ["Tops", "Bottoms", "Dresses", "Outerwear"][i % 4],
  }));

  const [filteredProducts, setFilteredProducts] = useState(dummyProducts);
  const [groupedProducts, setGroupedProducts] = useState<
    Record<string, Product[]>
  >({});

  useEffect(() => {
    // Group products by category
    const grouped = filteredProducts.reduce((acc, product) => {
      if (!acc[product.category]) {
        acc[product.category] = [];
      }
      acc[product.category].push(product);
      return acc;
    }, {} as Record<string, Product[]>);
    setGroupedProducts(grouped);
  }, [filteredProducts]);

  const handleSearch = (query: string) => {
    // Ensure dummyProducts is used here, declared in the same scope
    const filtered = dummyProducts.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <SearchSection onSearch={handleSearch} />
      <Categories />
      {Object.entries(groupedProducts).map(([category, products]) => (
        <ProductGrid
          key={category}
          category={category}
          products={products.slice(0, 4)}
          isCategoryPage={false}
        />
      ))}
    </div>
  );
};

export default Feed;
