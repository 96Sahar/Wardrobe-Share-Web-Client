import React, { useState, useEffect } from "react";
import Button from "../../../utils/UtilsComponents/Button";
import { useNavigate } from "react-router-dom";
import { likePost } from "../../../services/postService";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { postData } from "../../../services/interfaceService";
import { formatPictureUrl } from "../../../services/httpClient";

interface ProductGridProps {
  category: string;
  products: postData[];
  isCategoryPage?: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  category,
  products,
  isCategoryPage,
}) => {
  const navigate = useNavigate();
  const [likedProducts, setLikedProducts] = useState<{
    [key: string]: boolean;
  }>({});

  const handleCategoryClick = (categoryName: string) => {
    navigate(`/CategoryPage/${categoryName}`);
  };

  const handleCardClick = (product: postData) => {
    navigate(`/Item/${product._id}`);
  };

  category = category.charAt(0).toUpperCase() + category.slice(1);

  useEffect(() => {
    const initializeLikedProducts = () => {
      const userInfo = Cookies.get("userInfo");
      if (userInfo) {
        try {
          const user = JSON.parse(userInfo);
          const userId = user._id;
          if (userId) {
            const likedProductsMap = products.reduce(
              (acc: { [key: string]: boolean }, product) => {
                acc[product._id] = product.likes.includes(userId);
                return acc;
              },
              {}
            );
            setLikedProducts(likedProductsMap);
          }
        } catch (error) {
          console.error("Error parsing user info:", error);
        }
      }
    };

    initializeLikedProducts();
  }, [products]);

  const handleLike = async (productId: string, productLikes: string[]) => {
    try {
      const userInfo = Cookies.get("userInfo");
      if (!userInfo) {
        console.error("No user info found");
        toast.error("Must be logged in to like a post!");
        navigate("/LoginAndRegistration");
        return;
      }

      const user = JSON.parse(userInfo);
      const userId = user._id;
      if (!userId) {
        console.error("No user ID found in user info");
        return;
      }

      if (productLikes.includes(userId)) {
        productLikes.splice(productLikes.indexOf(userId), 1);
      } else {
        productLikes.push(userId);
      }

      await likePost(productId);
      setLikedProducts((prev) => ({
        ...prev,
        [productId]: !prev[productId],
      }));
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  return (
    <div className="bg-background py-4 md:py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          {category === "All" ? (
            <h2 className="text-2xl font-bold text-primary">All Items</h2>
          ) : category === "Liked" ? null : (
            <h2 className="text-2xl font-bold text-primary">{category}</h2>
          )}

          {!isCategoryPage && (
            <Button onClick={() => handleCategoryClick(category)}>
              View All {category}
            </Button>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="border-2 border-primary group bg-surface rounded-2xl p-4 shadow-sm hover:shadow-md transition-all hover:bg-[#d3d7d5] duration-300 cursor-pointer"
              onClick={() => handleCardClick(product)}
            >
              <div className="relative">
                <div className="aspect-square bg-background rounded-xl overflow-hidden mb-4">
                  <img
                    src={formatPictureUrl(product.picture)}
                    alt={product.title}
                    className="w-full h-full object-cover transform transition-transform group-hover:scale-105"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLike(product._id, product.likes);
                    }}
                    className={`absolute top-4 right-4 p-2 rounded-full shadow-md ${
                      likedProducts[product._id]
                        ? "bg-red-500 text-white"
                        : "bg-gray-100 text-gray-800"
                    } hover:bg-red-500 hover:text-white transition-colors`}
                  >
                    {likedProducts[product._id] ? "❤️" : "🤍"}
                  </button>
                </div>
              </div>
              <h3 className="font-medium text-primary mb-1">{product.title}</h3>
              <p className="text-primary/60 font-medium">{product.region}</p>
              <div className="flex justify-between items-center mt-2 text-sm text-black">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">❤️</span>
                  <span>{product.likes.length}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>{product.comments.length}</span>
                  <span className="text-lg">💬</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
