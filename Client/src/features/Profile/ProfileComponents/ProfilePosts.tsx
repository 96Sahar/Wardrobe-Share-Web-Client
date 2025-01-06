import React from "react";
import { Post } from "../../../utils/types/post";

interface ProfilePosts {
  posts: Post[];
}

const ProfilePosts: React.FC<ProfilePosts> = ({ posts }) => {
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfilePosts;
