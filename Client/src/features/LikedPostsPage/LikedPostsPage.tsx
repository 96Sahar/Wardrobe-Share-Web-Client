import { useState, useEffect } from "react";
import Header from "../../utils/UtilsComponents/Header";
import ProductGrid from "../Feed/FeedComponents/ProductGrid";
import Cookies from "js-cookie";
import { getUserByToken } from "../../services/userService";
import { getPostById } from "../../services/postService";
import { postData } from "../../services/interfaceService";
import LoadingSpinner from "../../utils/UtilsComponents/LoadingSpinner";

const LikedPostsPage = () => {
  const [likedPosts, setLikedPosts] = useState<postData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLikedPosts = async () => {
      const userInfo = Cookies.get("userInfo");
      if (userInfo) {
        try {
          const user = JSON.parse(userInfo);
          const userId = user._id;
          if (!userId) throw new Error("User ID not found");

          const userData = await getUserByToken();
          if (userData && userData.likedPosts) {
            const postDetails = await Promise.all(
              userData.likedPosts.map((postId: string) => getPostById(postId))
            );
            setLikedPosts(postDetails);
          }
        } catch (error) {
          console.error("Error fetching liked posts:", error);
        }
      }
      setIsLoading(false);
    };

    fetchLikedPosts();
  }, [likedPosts]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <main className="min-h-screen bg-gray-100">
      <Header />
      <div className="max-w-7xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-primary">Liked Posts:</h1>
        {likedPosts.length > 0 ? (
          <ProductGrid
            category="Liked"
            products={likedPosts}
            isCategoryPage={true}
          />
        ) : (
          <p className="text-center text-primary/60 mt-6 text-lg">
            You have no liked posts yet.
          </p>
        )}
      </div>
    </main>
  );
};

export default LikedPostsPage;
