import React, { useState, useEffect } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Header from "../../utils/UtilsComponents/Header";
import { Camera, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getUserByToken, updateUserProfile } from "../../services/userService";
import Button from "../../utils/UtilsComponents/Button";
import { toast } from "react-toastify";
import userIcon from "../../assets/user.png";

// Updated Zod schema to require picture
const profileSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long."),
  f_name: z.string().min(2, "First name must be at least 2 characters."),
  l_name: z.string().min(2, "Last name must be at least 2 characters."),
  picture: z.union([z.string(), z.instanceof(File), z.null()]).refine(
    (val) =>
      val !== null && // Prevent null values
      ((typeof val === "string" && val.trim().length > 0) ||
        val instanceof File),
    {
      message: "An image is required",
    }
  ),
});

console.log("userIcon: ", userIcon);
type ProfileFormValues = z.infer<typeof profileSchema>;

const EditProfile: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: "",
      f_name: "",
      l_name: "",
      picture: "",
    },
  });

  const formatPictureUrl = (picture: string) => {
    if (picture.startsWith("uploads\\")) {
      return `http://localhost:3000/${picture}`;
    }
    return picture;
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userData = await getUserByToken();

        setValue("username", userData.username);
        setValue("f_name", userData.f_name);
        setValue("l_name", userData.l_name);
        setValue("picture", userData.picture);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching user info:", err);
        setError("Failed to load user profile.");
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [setValue]);

  const onSubmit: SubmitHandler<ProfileFormValues> = async (data) => {
    setImageError(null);

    // Check if picture is empty or undefined
    if (
      !data.picture ||
      (typeof data.picture === "string" && !data.picture.trim())
    ) {
      setImageError("Profile picture is required");
      return;
    }

    try {
      // Create FormData if we have a File object
      if (data.picture instanceof File) {
        const formData = new FormData();
        formData.append("picture", data.picture);
        // First upload the image and get back the URL
        const uploadResponse = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        const { imageUrl } = await uploadResponse.json();

        // Now update the profile with the image URL
        const updatePayload = {
          username: data.username,
          f_name: data.f_name,
          l_name: data.l_name,
          picture: imageUrl, // Use the URL from the upload response
        };

        const updatedProfile = await updateUserProfile(updatePayload);
        console.log("Profile updated:", updatedProfile);
      } else {
        // If it's already a string (URL), just use it directly
        const updatePayload = {
          username: data.username,
          f_name: data.f_name,
          l_name: data.l_name,
          picture: data.picture,
        };

        const updatedProfile = await updateUserProfile(updatePayload);
        console.log("Profile updated:", updatedProfile);
      }

      setIsSubmitSuccessful(true);
      toast.success("User Updated!");
      navigate("/Profile");
    } catch (error: unknown) {
      console.log("error: ", error);
      toast.error("An error occurred during edit");
      setUpdateError(
        typeof error === "string"
          ? error
          : error instanceof Error
          ? error.message
          : "An error occurred during edit"
      );
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("picture", file);
      setImageError(null); // Clear any existing image error
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = document.getElementById(
          "preview-image"
        ) as HTMLImageElement;
        if (img) {
          img.src = reader.result as string;
        }
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      navigate("/Profile");
    }
  }, [isSubmitSuccessful, navigate]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-2xl mx-auto px-4 py-8">
        <button
          className="mb-6 flex items-center text-primary hover:text-primary/80 transition-colors"
          onClick={() => navigate("/Profile")}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Profile
        </button>
        <h1 className="text-2xl font-bold text-primary mb-6">Edit Profile</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 bg-surface rounded-2xl p-6 shadow-sm max-w-md mx-auto"
        >
          <div className="flex flex-col items-center">
            <div className="relative w-40 h-40 rounded-2xl overflow-hidden mb-6 bg-background">
              <Controller
                name="picture"
                control={control}
                render={({ field: { value } }) => (
                  <img
                    id="preview-image"
                    src={
                      value && typeof value === "string" && value.trim()
                        ? formatPictureUrl(value) // Use the existing picture URL
                        : value instanceof File
                        ? URL.createObjectURL(value) // Show the uploaded file
                        : userIcon // Use the default user icon when no picture is set
                    }
                    className="w-full h-full object-cover"
                  />
                )}
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
            {(imageError || errors.picture) && (
              <p className="text-red-500 text-sm mb-4">
                {imageError || errors.picture?.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-primary"
            >
              Username
            </label>
            <input
              id="username"
              {...register("username")}
              className="w-full px-3 py-2 bg-background border border-primary/20 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <label
              htmlFor="f_name"
              className="block text-sm font-medium text-primary"
            >
              First Name
            </label>
            <input
              id="f_name"
              {...register("f_name")}
              className="w-full px-3 py-2 bg-background border border-primary/20 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            {errors.f_name && (
              <p className="text-red-500 text-sm">{errors.f_name.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <label
              htmlFor="l_name"
              className="block text-sm font-medium text-primary"
            >
              Last Name
            </label>
            <input
              id="l_name"
              {...register("l_name")}
              className="w-full px-3 py-2 bg-background border border-primary/20 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            {errors.l_name && (
              <p className="text-red-500 text-sm">{errors.l_name.message}</p>
            )}
          </div>
          <div className="text-center">
            <Button
              buttonType="submit"
              className={isSubmitting ? "disabled" : ""}
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
            {updateError && <div className="text-red-500">{updateError}</div>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
