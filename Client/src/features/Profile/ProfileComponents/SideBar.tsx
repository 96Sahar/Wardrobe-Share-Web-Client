import React from "react";
import { LogOut, Edit, Mail } from "lucide-react";
import { UserProfile } from "../../../utils/types/profile";

interface SidebarProps {
  profile: UserProfile;
  onEditProfile: () => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  profile,
  onEditProfile,
  onLogout,
}) => {
  return (
    <div className="w-full md:w-80 shrink-0">
      <div className="bg-surface rounded-2xl p-6 shadow-sm sticky top-8">
        <div className="flex flex-col items-center text-center">
          <div className="w-32 h-32 rounded-full overflow-hidden mb-4 bg-background">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-xl font-bold text-primary mb-1">
            {profile.name}
          </h2>
          <div className="flex items-center text-primary/60 mb-4">
            <Mail className="w-4 h-4 mr-2" />
            <span>{profile.email}</span>
          </div>

          {profile.bio && (
            <p className="text-sm text-primary/80 mb-4">{profile.bio}</p>
          )}

          <div className="w-full space-y-3">
            <button
              onClick={onEditProfile}
              className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground rounded-lg px-4 py-2 hover:bg-primary/90 transition-colors"
            >
              <Edit className="w-4 h-4" />
              Edit Profile
            </button>

            <button
              onClick={onLogout}
              className="w-full flex items-center justify-center gap-2 bg-destructive text-destructive-foreground rounded-lg px-4 py-2 hover:bg-destructive/90 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>

          <div className="w-full mt-6 pt-6 border-t border-primary/10">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">
                  {profile.stats.posts}
                </div>
                <div className="text-sm text-primary/60">Posts</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">
                  {profile.stats.followers}
                </div>
                <div className="text-sm text-primary/60">Followers</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
