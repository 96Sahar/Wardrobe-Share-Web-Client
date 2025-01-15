import React, { useState, useEffect } from "react";
import Header from "../../utils/UtilsComponents/Header";
import SearchSection from "./FeedComponents/SearchSection";
import Categories from "./FeedComponents/Categories";
import ProductGrid from "./FeedComponents/ProductGrid";
import { getAllPost } from "../../services/postService";
import { postData } from "../../services/interfaceService";

const Feed: React.FC = () => {

  const [filteredProducts, setFilteredProducts] = useState<postData[]>([]);
  const [groupedProducts, setGroupedProducts] = useState<
    Record<string, postData[]>
  >({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAllPost("", "", "");
        setFilteredProducts(response.data);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const groupedProducts = filteredProducts.reduce(
      (acc: Record<string, postData[]>, product: postData) => {
        if (!acc[product.category]) {
          acc[product.category] = [];
        }
        acc[product.category].push(product);
        return acc;
      },
      {}
    );
    setGroupedProducts(groupedProducts);
  }, [filteredProducts]);


  return (
    <div className="min-h-screen bg-background">
      <Header />
      <SearchSection />
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
