import React from "react";

interface CardProps {
  picture: string;
  user: string;
  description: string;
  location: string;
  contact: string;
}

const Card: React.FC<CardProps> = ({
  picture,
  user,
  description,
  location,
  contact,
}) => {
  return (
    <div className="flex border rounded-lg items-start p-4 mb-4 bg-orange-50 ml-10 mr-10">
      <img
        src={picture}
        alt={description}
        className="w-36 h-36 mr-10 rounded-lg"
      />
      <div className="flex-1 bg-orange-50">
        <h2 className="text-xl font-semibold text-black bg-orange-50">
          {user}
        </h2>
        <p className="mt-2 text-black bg-orange-50">{description}</p>
        <p className="mt-4 text-black bg-orange-50">
          <span className="font-semibold bg-orange-50 text-black">
            Location:
          </span>
          {" " + location}
        </p>
        <p className="text-black bg-orange-50">
          <span className="font-semibold bg-orange-50">Contact:</span> {contact}
        </p>
      </div>
    </div>
  );
};

export default Card;
