import React, { useEffect, useState } from "react";
import ProductGrid from "../../Feed/FeedComponents/ProductGrid";
import { getAllPost } from "../../../services/postService";
import { postData } from "../../../services/interfaceService";
import LoadingSpinner from "../../../utils/UtilsComponents/LoadingSpinner";



interface GridProps {
  category:string, 
}

const Grid = ({ category}: GridProps): React.ReactElement => {
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [filteredProducts, setFilteredProducts] = useState<postData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setSelectedRegion("All"); 
  }, [category]); 

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      setFilteredProducts([]); 
      try {
        const response = await getAllPost(
          "", 
          category === "All" ? "" : category, 
          selectedRegion === "All" ? "" : selectedRegion
        );
        setFilteredProducts(response.data);
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchProducts();
  }, [category, selectedRegion]); 

  if (loading) {
    return (
      <LoadingSpinner />
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
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
            className="mt-1 block w-full rounded-md text-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary p-1"
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

      <div>
        {filteredProducts.length === 0 ? (
          <div className="text-center text-xl text-primary mt-5 p-3">No products found in this search, search for something else.</div>
        ) : (
          <ProductGrid
            key={category}
            category={category}
            products={filteredProducts}
            isCategoryPage={true}
          />
        )}
      </div>
    </div>
  );
};

export default Grid;
