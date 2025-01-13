import React from "react";
import { Post } from "../../../utils/types/post";

interface ProfilePostsProps {
  posts: Post[];
}

const ProfilePosts: React.FC<ProfilePostsProps> = ({ posts }) => {
  return (
    <div className="flex-1">
      <h1 className="text-2xl font-bold text-primary mb-6">My Posts</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-surface rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="aspect-video relative">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-medium text-primary mb-2">{post.title}</h3>
              <p className="text-sm text-primary/60">{post.description}</p>

              {/* Likes Counter */}
              <div className="flex items-center justify-between mt-4">
                <span className="text-sm text-primary/60">
                  {post.likes} {post.likes === 1 ? "Like" : "Likes"}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end space-x-4 mt-4">
                <button className="px-3 py-1 text-mid text-white bg-blue-500 rounded hover:bg-blue-600">
                  Edit
                </button>
                <button className="px-3 py-1 text-mid text-white bg-red-500 rounded hover:bg-red-600">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfilePosts;
