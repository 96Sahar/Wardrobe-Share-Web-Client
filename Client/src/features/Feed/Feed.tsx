import React, { useState } from "react";
import Header from "../../utils/UtilsComponents/Header";
import SearchSection from "./FeedComponents/SearchSection";
import Categories from "./FeedComponents/Categories";
import ProductGrid from "./FeedComponents/ProductGrid";

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
}

const Feed: React.FC = () => {
  const dummyProducts: Product[] = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    image: "/placeholder.svg",
    price: 29.99 + i,
  }));

  const [filteredProducts, setFilteredProducts] = useState(dummyProducts);

  const handleSearch = (query: string) => {
    const filtered = dummyProducts.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <div>
      <Header />
      <SearchSection onSearch={handleSearch} />
      <Categories />
      <ProductGrid products={filteredProducts} />
    </div>
  );
};

export default Feed;
