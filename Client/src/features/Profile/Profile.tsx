import React, { useState } from "react";
import Header from "../../utils/UtilsComponents/Header";
import Goals from "./ProfileComponents/Goals";
import Sidebar from "./ProfileComponents/SideBar";

const Profile: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const customerId = "12345"; // This would typically come from your auth system
  const followers = 150; // This would typically come from your backend

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
