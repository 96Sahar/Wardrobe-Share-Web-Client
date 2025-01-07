import React from "react";
import Header from "../../utils/UtilsComponents/Header";
import ProfilePosts from "./ProfileComponents/ProfilePosts";
import Sidebar from "./ProfileComponents/SideBar";
import { Post } from "../../utils/types/post";
import { UserProfile } from "../../utils/types/profile";
import userPhoto from "../../assets/user.png";
import itemPhoto from "../../assets/JeansDummyPic.jpg";

const Profile: React.FC = () => {
  const dummyPosts: Post[] = Array.from({ length: 6 }, (_, i) => ({
    id: i + "1",
    image: itemPhoto,
    title: `Sustainable Fashion Item ${i + 1}`,
    description:
      "A beautiful piece of sustainable clothing ready to be shared.",
    likes: Math.floor(Math.random() * 100),
  }));

  const userProfile: UserProfile = {
    firstName: "Jane",
    lastName: "Doe",
    username: "JaneDoe",
    email: "JaneDoe@gmail.com",
    avatar: userPhoto,
    stats: {
      posts: 6,
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

  const onDelete = () => {
    console.log("Delete account clicked");
    // Add your delete account logic here
  };

  return (
    <div>
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        <Sidebar
          profile={userProfile}
          onEditProfile={handleEditProfile}
          onLogout={handleLogout}
          onDeleteAccount={onDelete}
        />
        <ProfilePosts posts={dummyPosts} />
      </div>
    </div>
  );
};

export default Profile;
