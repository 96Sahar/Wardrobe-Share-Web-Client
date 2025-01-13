import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Header from "../../utils/UtilsComponents/Header";
import ProfilePosts from "./ProfileComponents/ProfilePosts";
import Sidebar from "./ProfileComponents/SideBar";
import { Post } from "../../utils/types/post";
import { UserProfile } from "../../utils/types/profile";
import userPhoto from "../../assets/user.png";
import itemPhoto from "../../assets/JeansDummyPic.jpg";
import { getUserById } from "../../services/userService";
import { checkToken } from "../../services/httpClient";

const Profile: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const dummyPosts: Post[] = Array.from({ length: 6 }, (_, i) => ({
    id: i + "1",
    image: itemPhoto,
    title: `Sustainable Fashion Item ${i + 1}`,
    description:
      "A beautiful piece of sustainable clothing ready to be shared.",
    likes: Math.floor(Math.random() * 100),
  }));

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        checkToken();
        const userInfo = Cookies.get("userInfo");

        if (userInfo) {
          const parsedUserInfo = JSON.parse(userInfo);
          const userData = await getUserById(parsedUserInfo._id);

          setUserProfile({
            f_name: userData.f_name,
            l_name: userData.l_name,
            username: userData.username,
            email: userData.email,
            avatar: userData.picture || userPhoto, // Fallback to default avatar
          });
          console.log(userProfile);
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, [userProfile]);

  const handleEditProfile = () => {
    console.log("Edit profile clicked");
  };

  const onDelete = () => {
    console.log("Delete account clicked");
  };

  if (!userProfile) {
    return <div>Loading...</div>; // Display loading while fetching user info
  }

  return (
    <div>
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        <Sidebar
          profile={userProfile}
          onEditProfile={handleEditProfile}
          onDeleteAccount={onDelete}
        />
        <ProfilePosts posts={dummyPosts} />
      </div>
    </div>
  );
};

export default Profile;
