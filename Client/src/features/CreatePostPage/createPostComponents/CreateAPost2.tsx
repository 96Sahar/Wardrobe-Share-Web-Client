import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import Button from "../../../utils/UtilsComponents/Button";
import { AuthResponse } from "../../../services/interfaceService";
import { createPost as createPostApi } from "../../../services/postService";
import { ChangeEvent, useState } from "react";

const schema = z.object({
  title: z.string().min(2, "Title is missing"),
  description: z.string().min(1, "Description is missing"),
  picture: z
    .any()
    .refine((files) => files?.length === 1, "Please upload a single image."),
  category: z.string().min(0, "Please select a category."),
  phone: z.string().min(9, "Phone number must be at least 9 characters."),
  region: z.string().min(0),
  city: z.string().min(0),
});

type PostFormFields = z.infer<typeof schema>;

const CreateAPost2 = () => {
  const [picture, setPicture] = useState<File | null>(null);
  const handlePicture = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPicture(e.target.files[0]);
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PostFormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<PostFormFields> = async (data) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("category", data.category);
      if (picture) {
        console.log(picture);
        formData.append("picture", picture);
      }
      formData.append("phone", data.phone);
      formData.append("region", data.region);
      formData.append("city", data.city);

      const response: AuthResponse = await createPostApi(formData);
      console.log("Post submitted successfully:", response);
    } catch (error) {
      console.log("Post Creation error:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-zinc-200 rounded-lg p-6 sm:p-8 md:p-10 lg:w-3/4 shadow-lg w-full max-w-4xl mx-auto flex flex-col gap-4"
    >
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
        What is your item?
      </h1>
      <h2 className="text-gray-600 text-base sm:text-lg">
        Fill in all the details below to upload your item.
      </h2>

      <div>
        <label className="block text-gray-800 font-bold mb-1">Title:</label>
        <input
          {...register("title")}
          type="text"
          placeholder="For example: Vintage dress"
          className={`w-full px-4 py-2 text-lg border ${
            errors.title ? "border-red-500" : "border-gray-300"
          } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="block text-gray-800 font-bold mb-1">
          Description:
        </label>
        <textarea
          {...register("description")}
          placeholder="Tell us about the brand, size, condition, etc."
          className={`w-full px-4 py-2 text-lg border ${
            errors.description ? "border-red-500" : "border-gray-300"
          } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">
            {errors.description.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-gray-800 font-bold mb-1">Image:</label>
        <input
          {...register("picture")}
          type="file"
          onChange={handlePicture}
          className={`w-full px-4 py-2 text-lg border ${
            errors.picture ? "border-red-500" : "border-gray-300"
          } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
        {errors.picture && typeof errors.picture.message === "string" && (
          <p className="text-red-500 text-sm mt-1">{errors.picture.message}</p>
        )}
      </div>

      <div>
        <label className="block text-gray-800 font-bold mb-1">Category:</label>
        <select
          {...register("category")}
          className={`w-full px-4 py-2 text-lg border ${
            errors.category ? "border-red-500" : "border-gray-300"
          } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
        >
          <option value="" disabled>
            Pick a category
          </option>
          <option value="tops">Tops (shirts, blouses, T-shirts)</option>
          <option value="bottoms">Bottoms (pants, jeans, skirts)</option>
          <option value="dresses">Dresses (casual, formal, maxi)</option>
          <option value="outerwear">Outerwear (jackets, coats)</option>
          <option value="accessories">Accessories (bags, hats, belts)</option>
        </select>
        {errors.category && (
          <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
        )}
      </div>

      <div>
        <label className="block text-gray-800 font-bold mb-1">Phone:</label>
        <input
          {...register("phone")}
          type="text"
          placeholder="Enter your phone number"
          className={`w-full px-4 py-2 text-lg border ${
            errors.phone ? "border-red-500" : "border-gray-300"
          } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
        {errors.phone && (
          <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
        )}
      </div>

      <div>
        <label className="block text-gray-800 font-bold mb-1">Region:</label>
        <select
          {...register("region")}
          className={`w-full px-4 py-2 text-lg border ${
            errors.region ? "border-red-500" : "border-gray-300"
          } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
        >
          <option value="" disabled>
            Pick a region
          </option>
          <option value="HaMerkaz">HaMerkaz</option>
          <option value="Tel Aviv">Tel Aviv</option>
          <option value="HaDarom">HaDarom</option>
          <option value="HaTzafon">HaTzafon</option>
          <option value="Yerushalayim">Yerushalayim</option>
        </select>
        {errors.region && (
          <p className="text-red-500 text-sm mt-1">{errors.region.message}</p>
        )}
      </div>

      <div>
        <label className="block text-gray-800 font-bold mb-1">City:</label>
        <input
          {...register("city")}
          type="text"
          placeholder="Enter your city"
          className={`w-full px-4 py-2 text-lg border ${
            errors.city ? "border-red-500" : "border-gray-300"
          } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
        {errors.city && (
          <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
        )}
      </div>

      <Button buttonType="submit" className={isSubmitting ? "disabled" : ""}>
        {isSubmitting ? "Submitting..." : "Post"}
      </Button>

      {errors.root && (
        <div className="text-red-500 text-sm mt-4">{errors.root.message}</div>
      )}
    </form>
  );
};

export default CreateAPost2;
