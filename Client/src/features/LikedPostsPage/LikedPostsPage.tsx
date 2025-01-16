import { useState, useEffect } from "react";
import Header from "../../utils/UtilsComponents/Header";
import ProductGrid from "../Feed/FeedComponents/ProductGrid";
import Cookies from "js-cookie";
import { getUserByToken } from "../../services/userService";
import { getPostById } from "../../services/postService"; // New function to fetch a post by ID
import { postData } from "../../services/interfaceService";

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
  }, []);

  if (isLoading) {
    return <p>Loading liked posts...</p>;
  }

  return (
    <main className="min-h-screen bg-gray-100">
      <Header />
      <div className="max-w-7xl mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6 text-primary">Liked Posts</h1>
        {likedPosts.length > 0 ? (
          <ProductGrid
            category="Liked"
            products={likedPosts}
            isCategoryPage={true}
          />
        ) : (
          <p className="text-center text-primary/60">
            You have no liked posts yet.
          </p>
        )}
      </div>
    </main>
  );
};

export default LikedPostsPage;
