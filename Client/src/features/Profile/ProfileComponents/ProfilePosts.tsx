import React, { useEffect, useState } from "react";
import { Post } from "../../../utils/types/post";
import Cookies from "js-cookie";
import { deletePost, getAllPost } from "../../../services/postService";
import { UserData } from "../../../services/interfaceService";
import Modal from "../../../utils/UtilsComponents/Modal";
import { toast } from "react-toastify";

const ProfilePosts: React.FC<UserData> = () => {
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);

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
        setError("Failed to fetch user posts.");
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
                      {post.likes} {post.likes === 1 ? "Like" : "Likes"}
                    </span>
                  </div>

                  <div className="flex items-center justify-end space-x-4 mt-4">
                    <button className="px-3 py-1 text-mid text-white bg-blue-500 rounded hover:bg-blue-600">
                      Edit
                    </button>
                    <button
                      className="px-3 py-1 text-mid text-white bg-red-500 rounded hover:bg-red-600"
                      onClick={() => setPostToDelete(post._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-primary/60">
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
