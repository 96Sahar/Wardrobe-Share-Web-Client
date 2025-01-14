import React, { useState, useEffect } from "react";
import Header from "../../utils/UtilsComponents/Header";
import SearchSection from "./FeedComponents/SearchSection";
import Categories from "./FeedComponents/Categories";
import ProductGrid from "./FeedComponents/ProductGrid";
import Jeans from "../../assets/JeansDummyPic.jpg";

interface Product {
  _id: string;
  picture: string;
  description: string;
  title: string;
  likes: string[];
  category: string;
  phone: string;
  region: string;
  city: string;
  user: string;
}

const Feed: React.FC = () => {
  // Define the dummy products inside the component
  const dummyProducts: Product[] = Array.from({ length: 32 }, (_, i) => ({
    _id: i.toString(),
    picture: Jeans,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    title: `Product ${i}`,
    likes: [],
    category: i % 2 === 0 ? "Jeans" : "Shirts",
    phone: "1234567890",
    region: "Region",
    city: "City",
    user: "User",
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
      product.title.toLowerCase().includes(query.toLowerCase())
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
