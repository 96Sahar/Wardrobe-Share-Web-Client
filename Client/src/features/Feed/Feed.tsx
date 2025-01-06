import React, { useEffect, useState } from "react";
import Header from "../../utils/UtilsComponents/Header";
import SearchSection from "./FeedComponents/SearchSection";
import Categories from "./FeedComponents/Categories";
import ProductGrid from "./FeedComponents/ProductGrid";
import axios from "axios";

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
}

interface User {
  username: string;
  password: string;
  email: string;
  f_name?: string;
  l_name?: string;
  picture?: string;
  likedPosts?: [string];
  refreshTokens?: [string];
}

const Feed: React.FC = () => {
  const dummyProducts: Product[] = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    name: `Sustainable ${i % 2 === 0 ? "Cotton" : "Linen"} ${
      i % 3 === 0 ? "Shirt" : "Pants"
    }`,
    image: "/placeholder.svg",
    price: 29.99 + i * 10,
  }));

  const [filteredProducts, setFilteredProducts] = useState(dummyProducts);

  const handleSearch = (query: string) => {
    const filtered = dummyProducts.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<User[]>("http://localhost:3000/user");
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <SearchSection onSearch={handleSearch} />
        <Categories />
        <ProductGrid products={filteredProducts} />
      </main>
    </div>
  );
};

export default Feed;
