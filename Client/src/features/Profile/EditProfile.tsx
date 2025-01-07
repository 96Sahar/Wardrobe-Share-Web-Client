import React, { useState } from "react";
import Header from "../../utils/UtilsComponents/Header";
import { UserProfile } from "../../utils/types/profile";
import { Camera, Save, ArrowLeft } from "lucide-react";

const EditProfile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>({
    name: "Jane Doe",
    email: "jane.doe@example.com",
    avatar: "/placeholder.svg",
    bio: "Passionate about sustainable fashion and sharing great finds!",
    stats: {
      posts: 24,
      followers: 1200,
    },
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Profile updated:", profile);
    // Here you would typically send the updated profile to your backend
    // After successful update, redirect to profile page
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prev) => ({ ...prev, avatar: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-2xl mx-auto px-4 py-8">
        <button className="mb-6 flex items-center text-primary hover:text-primary/80 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Profile
        </button>
        <h1 className="text-2xl font-bold text-primary mb-6">Edit Profile</h1>
        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-surface rounded-2xl p-6 shadow-sm max-w-md mx-auto"
        >
          <div className="flex flex-col items-center">
            <div className="relative w-40 h-40 rounded-2xl overflow-hidden mb-6 bg-background">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-full h-full object-cover"
              />
              <label
                htmlFor="avatar-upload"
                className="absolute bottom-2 right-2 bg-primary rounded-full text-primary-foreground p-2 cursor-pointer"
              >
                <Camera className="w-5 h-5" />
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-primary"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={profile.name}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 bg-background border border-primary/20 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-primary"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={profile.email}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 bg-background border border-primary/20 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="bio"
              className="block text-sm font-medium text-primary"
            >
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              value={profile.bio}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-2 bg-background border border-primary/20 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <button
            type="submit"
            className="w-full flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
