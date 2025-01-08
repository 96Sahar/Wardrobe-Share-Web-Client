import React from "react";
import icon from "../../../assets/user.png";
import Button from "../../../utils/UtilsComponents/Button";

const CommentSection = () => {
  return (
    <div className="flex flex-col w-full sm:w-1/2 mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Comments section:</h1>
      <div className="flex flex-col space-y-6 sm:space-y-10">
        {/* Comment 1 */}
        <div className="flex items-start sm:items-center space-x-3 sm:space-x-4">
          <img src={icon} alt="User" className="w-10 h-10 rounded-full" />
          <div className="flex flex-col w-full">
            <p className="text-sm font-semibold">John Doe</p>
            <p className="text-sm text-primary/60">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
          <div className="flex space-x-2 sm:space-x-4">
            <button className="text-primary text-xs sm:text-sm hover:underline">Edit</button>
            <button className="text-red-600 text-xs sm:text-sm hover:underline">Delete</button>
          </div>
        </div>
        {/* Comment 2 */}
        <div className="flex items-start sm:items-center space-x-3 sm:space-x-4">
          <img src={icon} alt="User" className="w-10 h-10 rounded-full" />
          <div className="flex flex-col w-full">
            <p className="text-sm font-semibold">Jane Doe</p>
            <p className="text-sm text-primary/60">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
          <div className="flex space-x-2 sm:space-x-4">
            <button className="text-primary text-xs sm:text-sm hover:underline">Edit</button>
            <button className="text-red-600 text-xs sm:text-sm hover:underline">Delete</button>
          </div>
        </div>
        {/* Add new comment */}
        <div className="flex items-center space-x-4">
          <img src={icon} alt="User" className="w-12 h-12 rounded-full" />
          <textarea
            className="w-full p-2 text-sm bg-surface rounded-lg"
            placeholder="Write a comment..."
          ></textarea>
        </div>
      </div>
      <Button className="self-end px-4 py-1 mt-2 text-sm text-white bg-primary rounded-lg">
        Leave a Comment
      </Button>
    </div>
  );
};

export default CommentSection;
