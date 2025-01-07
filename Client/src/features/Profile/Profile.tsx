import React from "react";
import Header from "../../utils/UtilsComponents/Header";
import ProfilePosts from "./ProfileComponents/ProfilePosts";
import Sidebar from "./ProfileComponents/SideBar";
import { Post } from "../../utils/types/post";
import { UserProfile } from "../../utils/types/profile";

const Profile: React.FC = () => {
  const dummyPosts: Post[] = Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    image: "/placeholder.svg",
    title: `Sustainable Fashion Item ${i + 1}`,
    description:
      "A beautiful piece of sustainable clothing ready to be shared.",
  }));

  const userProfile: UserProfile = {
    name: "Jane Doe",
    email: "jane.doe@example.com",
    avatar: "/placeholder.svg",
    stats: {
      posts: 24,
      followers: 1200,
    },
  };

  const handleEditProfile = () => {
    console.log("Edit profile clicked");
    // Add your edit profile logic here
  };

  const handleLogout = () => {
    console.log("Logout clicked");
    // Add your logout logic here
  };

  return (
    <div>
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        <ProfilePosts posts={dummyPosts} />
        <Sidebar
          profile={userProfile}
          onEditProfile={handleEditProfile}
          onLogout={handleLogout}
        />
      </div>
    </div>
  );
};

export default Profile;
