import React, { useState, useEffect } from "react";
import { getUserById } from "../../../services/userService";
import { likePost } from "../../../services/postService";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { postData } from "../../../services/interfaceService";

interface User {
  fullname: string;
  picture: string;
}

interface PostProps {
  product: postData;
}

const PostDetails: React.FC<PostProps> = ({ product }) => {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [lister, setLister] = useState<User | null>(null);

  const handleLike = async (productId: string) => {
    try {
      const userInfo = Cookies.get("userInfo");
      if (!userInfo) {
        console.error("No user info found");
        toast.error("Must be logged in to like a post!");
        navigate("/loginAndRegistration");
        return;
      }

      const user = JSON.parse(userInfo); // Parse the JSON string
      const userId = user._id; // Extract the user ID
      if (!userId) {
        console.error("No user ID found in user info");
        return;
      }

      await likePost(productId); // Trigger the API to toggle the like
      setLiked((prev) => !prev); // Toggle the like state
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const formatPictureUrl = (picture: string) => {
    if (picture.startsWith("uploads\\")) {
      return `http://localhost:3000/${picture}`;
    }
    return picture;
  };

  useEffect(() => {
    const fetchListerDetails = async () => {
      try {
        const response = await getUserById(product.user);
        console.log(response);
        setLister(response);
      } catch (err) {
        console.error("Error fetching lister details:", err);
      }
    };

    fetchListerDetails();
  }, [product.user]);

  useEffect(() => {
    const initializeLikedStatus = () => {
      const userInfo = Cookies.get("userInfo");
      if (userInfo) {
        try {
          const user = JSON.parse(userInfo); // Parse the JSON string
          const userId = user._id; // Extract the user ID
          if (userId) {
            // Check if the user ID exists in the product's likes array
            setLiked(product.likes.includes(userId));
          }
        } catch (error) {
          console.error("Error parsing user info:", error);
        }
      }
    };

    initializeLikedStatus();
  }, []);

  return (
    <div className="max-w-2xl mx-auto rounded-lg overflow-hidden">
      {/* Picture with Like Button */}
      <div className="relative w-full">
        <img
          src={formatPictureUrl(product.picture)}
          alt={product.title}
          className="w-full object-cover h-96"
        />
        <button
          onClick={()=>handleLike(product._id)}
          className={`absolute top-4 right-4 p-2 rounded-full shadow-md ${
            liked
              ? "bg-red-500 text-white"
              : "bg-gray-100 text-gray-800"
          } hover:bg-red-500 hover:text-white transition-colors`}
        >
          {liked ? "❤️" : "🤍"}
        </button>
      </div>
      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          {product.title}
        </h1>

        {/* Description */}
        <p className="text-gray-600 font-bold text-lg mb-2">About the item:</p>
        <p className="text-gray-600 text-lg mb-6">{product.description}</p>

        {/* Details */}
        <p className="text-gray-600 font-bold text-lg mb-2">Item details:</p>
        <div className="space-y-4 text-gray-700 text-base">
          <p>
            <span className="font-bold">Category:</span> {product.category}
          </p>
          <p>
            <span className="font-bold">Phone:</span> {product.phone}
          </p>
          <p>
            <span className="font-bold">Region:</span> {product.region}
          </p>
          <p>
            <span className="font-bold">City:</span> {product.city}
          </p>
        </div>

        {/* User Info */}
        <p className="text-gray-600 font-bold text-lg mt-6">The lister:</p>
        {lister ? (
          <div className="flex items-center mt-2">
            <img
              src={formatPictureUrl(lister.picture)}
              alt={lister.fullname}
              className="w-12 h-12 rounded-full object-cover"
            />
            <p className="ml-4 text-gray-800 font-semibold">
              {lister.fullname}
            </p>
          </div>
        ) : (
          <p className="text-gray-600 mt-2">Loading lister details...</p>
        )}
      </div>
    </div>
  );
};

export default PostDetails;
