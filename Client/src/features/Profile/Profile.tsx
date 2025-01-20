import React, { useEffect, useState } from "react";
import Header from "../../utils/UtilsComponents/Header";
import ProfilePosts from "./ProfileComponents/ProfilePosts";
import Sidebar from "./ProfileComponents/SideBar";
import { UserProfile } from "../../utils/types/profile";
import { getUserByToken } from "../../services/userService";
import LoadingSpinner from "../../utils/UtilsComponents/LoadingSpinner";

const Profile: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        setIsLoading(true);
        const userData = await getUserByToken();

        setUserProfile({
          f_name: userData.f_name,
          l_name: userData.l_name,
          username: userData.username,
          email: userData.email,
          picture: userData.picture,
        });
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user info:", error);
        setError("Failed to load user profile. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!userProfile) {
    return <div>No user profile found.</div>;
  }

  return (
    <div>
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        <Sidebar profile={userProfile} />
        <ProfilePosts />
      </div>
    </div>
  );
};

export default Profile;
