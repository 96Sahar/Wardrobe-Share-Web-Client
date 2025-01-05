import React from "react";
import { FaUserEdit, FaUsers } from "react-icons/fa";

interface SidebarProps {
  followers: number;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ followers, onLogout }) => {
  return (
    <div className="w-64 border-l border-slate-700 p-4 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center space-x-2 text-slate-700">
          <FaUsers className="text-xl" />
          <h3 className="font-semibold">Followers</h3>
        </div>
        <p className="text-slate-600">{followers}</p>
      </div>

      <div className="space-y-2">
        <div className="flex items-center space-x-2 text-slate-700">
          <FaUserEdit className="text-xl" />
          <h3 className="font-semibold">Editor</h3>
        </div>
        <button className="text-slate-600 hover:text-slate-800">
          Edit Profile
        </button>
      </div>

      <button
        onClick={onLogout}
        className="w-full py-2 px-4 bg-slate-700 text-white rounded hover:bg-slate-800 transition-colors"
      >
        Log out
      </button>
    </div>
  );
};

export default Sidebar;
