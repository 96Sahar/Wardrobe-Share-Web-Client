import React, { useState, useEffect } from "react";
import Header from "../../utils/UtilsComponents/Header";
import LoadingSpinner from "../../utils/UtilsComponents/LoadingSpinner";
import PostDetails from "./PostPageComponents/PostDetails";
import CommentSection from "./PostPageComponents/CommentSection";
import { useLocation } from "react-router-dom";
import { postData } from "../../services/interfaceService";
import { getPostById } from "../../services/postService";

const PostPage: React.FC = () => {
  const location = useLocation();
  const url = location.pathname;
  const postId = url.split("/Item/")[1];
  console.log(postId);
  const [product, setProduct] = useState<postData | null>(null);
  const [commentsCount, setCommentsCount] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!postId) {
      setError("Post ID is undefined.");
      setLoading(false);
      return;
    }

    const fetchPost = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getPostById(postId);
        setProduct(response);
        setCommentsCount(response.comments.length);
      } catch (error) {
        console.error("Error fetching post:", error);
        setError("Post not found.");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [postId]);

  return (
    <div>
      <Header />
      <div className="flex flex-col md:flex-row gap-6 mt-4 p-6">
        {loading && <LoadingSpinner />}
        {!loading && error && (
          <div className="h-screen flex items-center justify-center mx-auto">
            {error}
          </div>
        )}
        {!loading && product && (
          <>
            <PostDetails product={product} commentsCount={commentsCount} />
            <CommentSection
              postId={product._id}
              comments={product.comments}
              setCommentsCount={setCommentsCount}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default PostPage;
