import React, { useState } from "react";
import { IData } from "../../../utils/types/cardData";

interface DataProps {
  data: IData;
}

const PostDetails: React.FC<DataProps> = ({ data }) => {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };

  return (
    <div className="max-w-2xl mx-auto rounded-lg overflow-hidden">
      {/* Picture with Like Button */}
      <div className="relative w-full">
        <img
          src={data.picture}
          alt={data.title}
          className="w-full object-cover h-96"
        />
        <button
          onClick={handleLike}
          className={`absolute top-4 right-4 p-2 rounded-full shadow-md ${
            liked ? "bg-red-500 text-white" : "bg-gray-100 text-gray-800"
          } hover:bg-red-500 hover:text-white transition-colors`}
        >
          {liked ? "❤️" : "🤍"}
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800 mb-6">{data.title}</h1>

        {/* Description */}
        <p className="text-gray-600 font-bold text-lg mb-2">About the item:</p>
        <p className="text-gray-600 text-lg mb-6">{data.description}</p>

        {/* Details */}
        <p className="text-gray-600 font-bold text-lg mb-2">Item details:</p>
        <div className="space-y-4 text-gray-700 text-base">
          <p>
            <span className="font-bold">Category:</span> {data.category}
          </p>
          <p>
            <span className="font-bold">Phone:</span> {data.phone}
          </p>
          <p>
            <span className="font-bold">Region:</span> {data.region}
          </p>
          <p>
            <span className="font-bold">City:</span> {data.city}
          </p>
        </div>

        {/* User Info */}
        <p className="text-gray-600 font-bold text-lg mt-6">The lister:</p>
        <div className="flex items-center mt-2">
          <img
            src={data.userImage}
            alt={data.user}
            className="w-12 h-12 rounded-full object-cover"
          />
          <p className="ml-4 text-gray-800 font-semibold">{data.user}</p>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
