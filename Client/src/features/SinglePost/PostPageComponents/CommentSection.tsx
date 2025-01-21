import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import {
  getCommentsByPostId,
  createComment,
  updateComment,
  deleteComment,
} from "../../../services/commentService";
import { getUserById } from "../../../services/userService";
import icon from "../../../assets/user.png";
import Button from "../../../utils/UtilsComponents/Button";
import { toast } from "react-toastify";

interface Comment {
  _id: string;
  user: string;
  post: string;
  content: string;
  fullname?: string;
  picture?: string;
}

interface CommentSectionProps {
  postId: string;
  comments: string[];
  setCommentsCount: React.Dispatch<React.SetStateAction<number>>;
}

const CommentSection: React.FC<CommentSectionProps> = ({ postId, setCommentsCount }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");
  const [userData, setUserData] = useState<{
    _id: string;
    fullname: string;
    picture: string;
  } | null>(null);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const userInfo = Cookies.get("userInfo");
        if (userInfo) {
          const user = JSON.parse(userInfo);
          console.log("User info:", user._id);
          const data = await getUserById(user._id);
          console.log("User data:", data);
          setUserData({
            _id: user._id,
            fullname: data.fullname,
            picture: data.picture,
          });
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };
    getUserInfo();
  }, []);

  // Fetch comments on component mount
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const fetchedComments: Comment[] = await getCommentsByPostId(postId);
        const commentsWithUserData = await Promise.all(
          fetchedComments.map(async (comment: Comment) => {
            const userData = await getUserById(comment.user);
            return {
              ...comment,
              fullname: userData.fullname,
              picture: userData.picture,
            };
          })
        );
        setComments(commentsWithUserData);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchComments();
  }, [postId]);

  const formatPictureUrl = (picture: string) => {
    if (picture.startsWith("uploads\\")) {
      return `http://localhost:3000/${picture}`;
    }
    return picture;
  };


  const handleAddComment = async () => {
    try {
      if (!newComment.trim()) {
        toast.error("Comment cannot be empty!");
        return;
      }
      if (!userData) {
        toast.error("User data not loaded. Please try again.");
        return;
      }

      const response = await createComment(postId, newComment);
      console.log("New comment created:", response);
  
      const newCommentData: Comment = {
        _id: response._id, 
        user: userData._id, 
        post: postId, 
        content: newComment, 
        fullname: userData.fullname, 
        picture: userData.picture, 
      };
      setComments((prevComments) => [...prevComments, newCommentData]);
      setNewComment(""); 
      setCommentsCount((prevCount) => prevCount + 1);
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error("Failed to add comment. Please try again.");
    }
  };
  
  const handleEditComment = async () => {
    try {
      if (!editingText.trim()) {
        toast.error("Comment cannot be empty!");
        return;
      }
      await updateComment(editingText, editingCommentId!);

      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment._id === editingCommentId
            ? { ...comment, content: editingText }
            : comment
        )
      );
      setEditingCommentId(null);
      setEditingText("");
      toast.success("Comment updated successfully!");
    } catch (error) {
      console.error("Error editing comment:", error);
      toast.error("Failed to edit comment. Please try again.");
    }
  };
  

const handleDeleteComment = async (commentId: string) => {
  try {
    console.log("Deleting comment:", commentId);
    await deleteComment(commentId);
    setComments((prevComments) =>
      prevComments.filter((comment) => comment._id !== commentId)
    );
    if (editingCommentId === commentId) {
      setEditingCommentId(null);
    }
    setCommentsCount((prevCount) => prevCount - 1);
    toast.success("Comment deleted successfully!");
  } catch (error) {
    console.error("Error deleting comment:", error);
    toast.error("Failed to delete comment. Please try again.");
  }
};
;

  return (
    <div className="flex flex-col w-full sm:w-1/2 mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Comments section:</h1>
      <div className="flex flex-col space-y-2">
        {/* Show "No comments yet" message if comments are empty */}
        {comments.length === 0 && (
          <p className="text-center text-md text-primary/60 mb-10">
            No comments yet, be the first to comment!
          </p>
        )}
  
        {/* Render comments if available */}
        {comments.map((comment) => (
          <div
            key={comment._id}
            className="flex items-start sm:items-center space-x-3 sm:space-x-4 mb-10"
          >
            <img
              src={formatPictureUrl(comment.picture || icon)} // Add default icon              
              alt={comment.fullname}
              className="w-10 h-10 rounded-full"
            />
            <div className="flex flex-col w-full">
              <p className="text-sm font-semibold">{comment.fullname}</p>
              {editingCommentId === comment._id ? (
                <textarea
                  className="text-sm text-primary/60 w-full p-2 bg-white rounded-lg"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                />
              ) : (
                <p className="text-sm text-primary/60">{comment.content}</p>
              )}
            </div>
            {userData && userData._id === comment.user && (
              <div className="flex space-x-2 sm:space-x-4">
                {editingCommentId === comment._id ? (
                  <>
                    <button
                      onClick={handleEditComment}
                      className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-2 py-1 text-center mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingCommentId(null)}
                      className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-1 text-center mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setEditingCommentId(comment._id);
                        setEditingText(comment.content);
                      }}
                      className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1 text-center mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteComment(comment._id)}
                      className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-1 text-center mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        ))}
  
        {/* Add new comment */}
        {userData && (
          <div className="flex items-center space-x-4">
            <img
              src={formatPictureUrl(userData.picture || icon)}
              alt="User"
              className="w-12 h-12 rounded-full"
            />
            <textarea
              className="w-full p-2 text-sm bg-surface rounded-lg"
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            ></textarea>
          </div>
        )}
        {userData && (
          <Button
            className="self-end px-4 text-sm text-white bg-primary rounded-lg"
            onClick={handleAddComment}
          >
            Leave a Comment
          </Button>
        )}
      </div>
    </div>
  );
  
};

export default CommentSection;
