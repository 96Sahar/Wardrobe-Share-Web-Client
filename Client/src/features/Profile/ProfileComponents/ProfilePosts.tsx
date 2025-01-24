import React, { useEffect, useState } from "react";
import { postData } from "../../../services/interfaceService";
import Cookies from "js-cookie";
import { deletePost, getAllPost } from "../../../services/postService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../../utils/UtilsComponents/LoadingSpinner";
import Modal from "../../../utils/UtilsComponents/Modal";

const ProfilePosts: React.FC = () => {
  const navigate = useNavigate();
  const [userPosts, setUserPosts] = useState<postData[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);

  const handleEditPost = (postId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    navigate(`/CreatePost/${postId}`, { state: { postId } });
  };

  const handleDeletePost = async (postId: string) => {
    try {
      const response = await deletePost(postId);
      if (response) {
        window.location.reload();
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("Failed to delete post");
    }
    setPostToDelete(null);
  };

  const handleCardClick = (product: postData) => {
    navigate(`/Post/${product._id}`, { state: { product } });
  };

  const fetchUserPosts = async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const userInfo = Cookies.get("userInfo");
      const userId = userInfo ? JSON.parse(userInfo)._id : null;

      if (!userId) {
        setError("User is not logged in.");
        setLoading(false);
        return;
      }

      const response = await getAllPost(userId, "", "", page, 20);
      const newPosts = response.data;

      if (newPosts.length > 0) {
        setUserPosts((prev) => [...prev, ...newPosts]);
        if (newPosts.length < 10) setHasMore(false); 
      } else {
        setHasMore(false);
      }
    } catch (error: unknown) {
      console.error("Fetch user posts error: ", error);
      setError("Failed to fetch posts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserPosts();
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        if (!loading && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <>
      <div className="flex-1">
        <h1 className="text-2xl font-bold text-primary mb-6">My Posts</h1>
        {userPosts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {userPosts.map((post) => (
              <div
                key={post._id}
                className="bg-surface rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border-2 border-primary hover:bg-[#d3d7d5] cursor-pointer"
                onClick={() => handleCardClick(post)}
              >
                <div className="aspect-video relative">
                  <img
                    src={`http://localhost:3000/${post.picture}`}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-primary mb-2">{post.title}</h3>
                  <p className="text-md text-primary/60">{post.description}</p>
                  <div className="flex items-center mt-2 text-sm text-black space-x-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">❤️</span>
                      <span>{post.likes.length}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">💬</span>
                      <span>{post.comments.length}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-end space-x-4 mt-4">
                    <button
                      className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 text-md rounded-lg px-2 py-1 text-center mb-2"
                      onClick={(e) => handleEditPost(post._id, e)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 text-md rounded-lg px-2 py-1 text-center mb-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        setPostToDelete(post._id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-lg text-primary/60">You haven't created any posts yet.</p>
        )}
        {loading && <LoadingSpinner />}
        {!hasMore && userPosts.length > 0 && (
          <div className="text-center text-lg text-primary mt-5 p-3">
            No more posts to load.
          </div>
        )}
      </div>
      <Modal
        isOpen={!!postToDelete}
        onClose={() => setPostToDelete(null)}
        onConfirm={() => postToDelete && handleDeletePost(postToDelete)}
        title="Are you sure?"
        description="This action will permanently delete this post information"
        confirmText="Delete Post"
        cancelText="Cancel"
      />
    </>
  );
};

export default ProfilePosts;
