import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import {
  getCommentsByPostId,
} from "../../../services/commentService";
import { getUserById } from "../../../services/userService";
import icon from "../../../assets/user.png";
import Button from "../../../utils/UtilsComponents/Button";

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
}

const CommentSection: React.FC<CommentSectionProps> = ({ postId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");
  const [userData, setUserData] = useState<any | null>(null);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const userInfo = Cookies.get("userInfo");
        if (userInfo) {
          const user = JSON.parse(userInfo);
          console.log("User info:", user._id);
          const data = await getUserById(user._id);
          setUserData(data); 
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

  // Handle new comment submission
  const handleAddComment = async () => {};

  // Handle comment editing
  const handleEditComment = async () => {};

  // Handle comment deletion
  const handleDeleteComment = async () => {};

  return (
    <div className="flex flex-col w-full sm:w-1/2 mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Comments section:</h1>
      <div className="flex flex-col space-y-6 sm:space-y-10">
        {comments.map((comment) => (
          <div
            key={comment._id}
            className="flex items-start sm:items-center space-x-3 sm:space-x-4"
          >
            <img
              src={comment.picture || icon}
              alt={comment.fullname}
              className="w-10 h-10 rounded-full"
            />
            <div className="flex flex-col w-full">
              <p className="text-sm font-semibold">{comment.fullname}</p>
              {editingCommentId === comment._id ? (
                <textarea
                  className="text-sm text-primary/60 w-full"
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
                      className="text-green-600 text-xs sm:text-sm hover:underline"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingCommentId(null)}
                      className="text-red-600 text-xs sm:text-sm hover:underline"
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
                      className="text-primary text-xs sm:text-sm hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteComment()}
                      className="text-red-600 text-xs sm:text-sm hover:underline"
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
              src={userData.picture || icon}
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
            className="self-end px-4 py-1 mt-2 text-sm text-white bg-primary rounded-lg"
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
