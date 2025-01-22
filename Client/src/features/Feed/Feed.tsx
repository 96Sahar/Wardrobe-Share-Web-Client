import React, { useState, useEffect } from "react";
import Header from "../../utils/UtilsComponents/Header";
import SearchSection from "./FeedComponents/SearchSection";
import Categories from "./FeedComponents/Categories";
import ProductGrid from "./FeedComponents/ProductGrid";
import { getFeedPosts } from "../../services/postService";
import { postData } from "../../services/interfaceService";
import ChatBot from "../Chatbot/ChatBot";
import LoadingSpinner from "../../utils/UtilsComponents/LoadingSpinner";

const Feed: React.FC = () => {
  const [groupedProducts, setGroupedProducts] = useState<
    Record<string, postData[]>
  >({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categoryOrder = [
    "tops",
    "bottoms",
    "dresses",
    "outerwear",
    "activewear",
    "sleepwear",
    "swimwear",
    "footwear",
    "accessories",
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await getFeedPosts();
        setGroupedProducts(response);
        setError(null);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError("Failed to load posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <SearchSection />
      <Categories />
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <div className="text-center text-red-500 mt-5 p-3">{error}</div>
      ) : (
        // Sort categories based on the predefined order
        categoryOrder
          .filter((category) => groupedProducts[category]) // Only include categories with products
          .map((category) => (
            <ProductGrid
              key={category}
              category={category}
              products={groupedProducts[category]}
              isCategoryPage={false}
            />
          ))
      )}
      <ChatBot />
    </div>
  );
};

export default Feed;
