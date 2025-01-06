import React, { useEffect, useState } from "react";
import Header from "../../utils/UtilsComponents/Header";
import Goals from "./ProfileComponents/Goals";
import Sidebar from "./ProfileComponents/SideBar";
import axios from "axios";

interface Post {
  title: string;
  description: string;
  image: string;
  category: string;
  phone: string;
  region: string;
  city: string;
}

const Profile: React.FC = () => {
  useEffect(() => {
    axios.get<Post[]>("http://localhost:3000/post").then((res) => {
      console.log(res.data);
    });
  }, []);

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const followers = 150;

  const handleLogout = () => {
    setIsLoggedIn(false);
    // Add your logout logic here
  };

  if (!isLoggedIn) {
    // Add your login redirect logic here
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <div className="flex">
        <main className="flex-1">
          <Goals />
          <div className="p-4 space-y-4">
            <div className="border border-slate-300 rounded-lg p-4 min-h-[200px]">
              {/* Additional profile content section 1 */}
            </div>
            <div className="border border-slate-300 rounded-lg p-4 min-h-[200px]">
              {/* Additional profile content section 2 */}
            </div>
          </div>
        </main>
        <Sidebar followers={followers} onLogout={handleLogout} />
      </div>
    </div>
  );
};

export default Profile;
