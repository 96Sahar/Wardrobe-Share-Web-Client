import React, { useEffect, useState } from "react";
import ProductGrid from "../../Feed/FeedComponents/ProductGrid";
import { getAllPost } from "../../../services/postService";
import { postData } from "../../../services/interfaceService";
import LoadingSpinner from "../../../utils/UtilsComponents/LoadingSpinner";

interface GridProps {
  category: string;
}

const Grid = ({ category }: GridProps): React.ReactElement => {
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [products, setProducts] = useState<postData[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [noResults, setNoResults] = useState(false); // Track no results state
  const [error, setError] = useState<string | null>(null); // Track error state

  useEffect(() => {
    // Reset state on category or region change
    setProducts([]);
    setPage(1);
    setHasMore(true);
    setNoResults(false);
    setError(null);
  }, [category, selectedRegion]);

  useEffect(() => {
    const fetchProducts = async () => {
      if(noResults) return; // Don't fetch if no results
      setLoading(true);
      setError(null);

      try {
        const response = await getAllPost(
          "",
          category === "All" ? "" : category,
          selectedRegion === "All" ? "" : selectedRegion,
          page,
          20
        );
        const newProducts = response.data;

        if (newProducts.length === 0 && page === 1) {
          // No results on the first page
          setNoResults(true);
        } else if (newProducts.length > 0) {
          setProducts((prev) => {
            const uniqueProducts = newProducts.filter(
              (product: postData) => !prev.some((p) => p._id === product._id)
            );
            return [...prev, ...uniqueProducts];
          });
          setNoResults(false); // Reset noResults if we get data
        }

        if (newProducts.length < 20) setHasMore(false); // No more pages
      } catch (err) {
        setNoResults(true);
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, selectedRegion, page]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 100
    ) {
      if (!loading && hasMore && !noResults && !error) {
        setPage((prevPage) => prevPage + 1); // Load the next page
      }
    }
  };

  useEffect(() => {
    if(noResults) return; 
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore, noResults, error]);

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
            onChange={(e) => {
              setSelectedRegion(e.target.value);
              setProducts([]);
              setPage(1);
              setHasMore(true);
              setNoResults(false);
              setError(null);
            }}
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
        {noResults ? (
          <div className="text-center text-xl text-primary mt-5 p-3">
            No items fit this search. Try a different filter or category.
          </div>
        ) : products.length === 0 && !loading ? (
          <div className="text-center text-xl text-primary mt-5 p-3">
            No products found in this search, search for something else.
          </div>
        ) : (
          <ProductGrid
            key={category}
            category={category}
            products={products}
            isCategoryPage={true}
          />
        )}
        {loading && <LoadingSpinner />}
        {!hasMore && !noResults && (
          <div className="text-center text-lg text-primary mt-5 p-3">
            No more products to load.
          </div>
        )}
      </div>
    </div>
  );
};

export default Grid;
