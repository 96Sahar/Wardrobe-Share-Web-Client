import React from "react";
import { postData } from "../../../services/interfaceService";

interface ProductCardProps {
  post: postData;
  isLiked?: boolean;
  onLikeClick?: () => void;
}

const ProductCard = ({
  post,
  isLiked = false,
  onLikeClick,
}: ProductCardProps): React.ReactElement => {
  const location = `${post.city}, ${post.region}`;

  return (
    <div className="relative w-full max-w-sm rounded-lg bg-white shadow-sm">
      <button
        onClick={onLikeClick}
        className="absolute right-3 top-3 z-10 rounded-full bg-white p-2 shadow-md transition-transform hover:scale-105"
        aria-label={isLiked ? "Remove from favorites" : "Add to favorites"}
      >
        <svg
          className={`h-5 w-5 ${
            isLiked
              ? "fill-red-500 stroke-red-500"
              : "fill-none stroke-gray-400"
          }`}
          viewBox="0 0 24 24"
          strokeWidth="2"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </button>

      <div className="relative aspect-square overflow-hidden rounded-t-lg">
        <img
          src={post.picture}
          alt={post.title}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="p-4 space-y-2">
        <div className="flex justify-between items-start">
          <h2 className="text-lg font-medium text-teal-700">{post.title}</h2>
          <span className="text-sm font-medium text-gray-500">
            {post.category}
          </span>
        </div>

        <p className="text-sm text-gray-600 line-clamp-2">{post.description}</p>

        <div className="flex justify-between items-center pt-2">
          <div className="text-sm text-gray-900">
            <p>{location}</p>
            <p className="text-gray-600">{post.phone}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
