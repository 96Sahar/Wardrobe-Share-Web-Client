import React, { useEffect, useState } from "react";
import { postData } from "../../../services/interfaceService";
import Cookies from "js-cookie";
import { deletePost, getAllPost } from "../../../services/postService";
import { UserData } from "../../../services/interfaceService";
import Modal from "../../../utils/UtilsComponents/Modal";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ProfilePosts: React.FC<UserData> = () => {
  const navigate = useNavigate();
  const [userPosts, setUserPosts] = useState<postData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);

  const handleEditPost = (postId: string, event: React.MouseEvent) => {
    console.log("postId in handleEditPost", postId);
    event.stopPropagation();

    navigate(`/CreatePost/${postId}`, { state: { postId } });
  };

  const handleDeletePost = async (postId: string) => {
    try {
      const response = await deletePost(postId);
      if (response) {
        toast.info("Post deleted successfully");
        // Remove the deleted post from the state
        setUserPosts((prevPosts) =>
          prevPosts.filter((post) => post._id !== postId)
        );
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("Failed to delete post");
    }
    setPostToDelete(null);
  };

  const handleCardClick = (product: postData) => {
    navigate(`/post/${product._id}`, { state: { product } });
  };

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const userInfo = Cookies.get("userInfo");
        const userId = userInfo ? JSON.parse(userInfo)._id : null;

        if (!userId) {
          setError("User is not logged in.");
          setLoading(false);
          return;
        }

        const response = await getAllPost(userId);
        setUserPosts(response.data);
        setLoading(false);
      } catch (error: unknown) {
        console.error("Fetch user posts error: ", error);
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

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
                className="bg-surface rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
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
                  <h3 className="font-medium text-primary mb-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-primary/60">{post.description}</p>

                  <div className="flex items-center justify-between mt-4">
                    <span className="text-sm text-primary/60">
                      {post.likes.length}{" "}
                      {post.likes.length === 1 ? "Like" : "Likes"}
                    </span>
                  </div>

                  <div className="flex items-center justify-end space-x-4 mt-4">
                    <button
                      className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 text-md rounded-lg px-2 py-1 text-center mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                      onClick={(e) => handleEditPost(post._id, e)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 text-md rounded-lg px-2 py-1 text-center mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log("postId: ", post._id);
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
          <p className="text-lg text-primary/60">
            You haven't created any posts yet.
          </p>
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
