import type React from "react";
import { useState, useEffect } from "react";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Header from "../../utils/UtilsComponents/Header";
import { Camera, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { updateUserProfile, getUserByToken } from "../../services/userService";
import Button from "../../utils/UtilsComponents/Button";
import LoadingSpinner from "../../utils/UtilsComponents/LoadingSpinner";
import user from "../../assets/user.png";
import { formatPictureUrl } from "../../services/httpClient";


const profileSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long.")
    .regex(/^[a-zA-Z0-9]+$/, "Username can only contain letters and numbers."),
  f_name: z.string().min(2, "First name must be at least 2 characters."),
  l_name: z.string().min(2, "Last name must be at least 2 characters."),
  picture: z.union([z.string(), z.instanceof(File)]).optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const EditProfile: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);

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
      picture: undefined,
    },
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userData = await getUserByToken();
        console.log(userData);
        setValue("username", userData.username);
        setValue("f_name", userData.f_name);
        setValue("l_name", userData.l_name);
        setValue("picture", userData.picture || " ");

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
    console.log("Form data:", data);
    try {
      const updatePayload: Record<string, any> = {
        username: data.username,
        f_name: data.f_name,
        l_name: data.l_name,
      };

      if (data.picture instanceof File) {
        updatePayload.picture = data.picture;
      } else if (typeof data.picture === "string" && data.picture !== "") {
        updatePayload.picture = data.picture;
      }

      console.log("updatePayload:", updatePayload);
      const updatedProfile = await updateUserProfile(updatePayload);
      console.log("Profile updated:", updatedProfile);

      setIsSubmitSuccessful(true);
    } catch (err: unknown) {
      console.error("Error saving profile:", err);
      setError(
        typeof err === "string"
          ? err
          : err instanceof Error
          ? err.message
          : "An error occurred during edit"
      );
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("Image file is too large. Please choose an image under 5MB.");
        return;
      }
      setValue("picture", file);
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

  if (loading) return <LoadingSpinner />;

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
                      value instanceof File
                        ? URL.createObjectURL(value)
                        : value && value.trim() !== ""
                        ? formatPictureUrl(value)
                        : user
                    }
                    alt="Profile Avatar"
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
            {error && <div className="text-red-500 mt-4 text-sm">{error}</div>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
