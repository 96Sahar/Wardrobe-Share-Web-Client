import React, { useState } from "react";
import { Edit, Mail, Delete } from "lucide-react";
import { UserProfile } from "../../../utils/types/profile";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "../../../services/userService";
import Modal from "../../../utils/UtilsComponents/Modal";
import icon from "../../../assets/user.png";

interface SidebarProps {
  profile?: UserProfile;
}

const Sidebar: React.FC<SidebarProps> = ({ profile }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    // Proceed to delete user when confirmed
    await deleteUser();
    navigate("/"); // Navigate to homepage after deletion
  };

  const formatPictureUrl = (picture: string) => {
    if (picture.startsWith("uploads\\")) {
      return `http://localhost:3000/${picture}`;
    }
    return picture;
  };

  return (
    <>
      <div className="w-full md:w-80 shrink-0">
        <div className="bg-surface rounded-2xl p-6 shadow-xl sticky top-8">
          <div className="flex flex-col items-center text-center">
            <div className="w-32 h-32 rounded-full overflow-hidden mb-4 bg-background">
              {profile?.picture ? (
                <img
                  src={
                    profile?.picture ? formatPictureUrl(profile?.picture) : ""
                  }
                  alt={profile?.f_name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={icon}
                  alt={profile?.f_name}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <h2 className="text-xl font-bold text-primary mb-3">
              {profile?.f_name} {profile?.l_name}
            </h2>
            <div className="flex items-center text-primary/60 mb-4">
              <Mail className="w-4 h-4 mr-2" />
              <span>{profile?.email}</span>
            </div>

            <div className="w-full space-y-3">
              <button
                onClick={() => navigate("/editProfile")}
                className="w-full flex items-center justify-center gap-2 bg-blue-500 text-primary-foreground rounded-lg px-4 py-2 hover:bg-blue-600 transition-colors"
              >
                <Edit className="w-4 h-4" />
                Edit Profile
              </button>

              <div className="mt-4">
                <button
                  onClick={() => setIsModalOpen(true)} // Open the modal when the delete button is clicked
                  className="w-full flex items-center justify-center gap-2 bg-red-500 text-destructive-foreground rounded-lg px-4 py-2 hover:bg-red-600"
                >
                  <Delete className="w-4 h-4" />
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Component */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)} // Close the modal without deleting
        onConfirm={handleDelete} // Confirm deletion by calling handleDelete directly
        title="Are you sure?"
        description="This action will permanently delete this user!"
        confirmText="Delete User"
        cancelText="Cancel"
      />
    </>
  );
};

export default Sidebar;
