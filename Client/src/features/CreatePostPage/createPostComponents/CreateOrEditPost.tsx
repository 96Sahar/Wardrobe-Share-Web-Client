import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import Button from "../../../utils/UtilsComponents/Button";
import { AuthResponse } from "../../../services/interfaceService";
import {
  createPost as createPostApi,
  updatePost as updatePostApi,
  getPostById as getPostApi,
} from "../../../services/postService";
import React from "react";
import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

interface City {
  objectId: string;
  name: string;
}

const schema = z.object({
  title: z.string().min(2, "Title is missing"),
  description: z.string().min(1, "Description is missing"),
  picture: z.union([
    z.string(), // For existing image URL when editing
    z
      .any()
      .refine((files) => files?.length === 1, "Please upload a single image."),
  ]),
  category: z.string().min(0, "Please select a category."),
  phone: z.string().min(9, "Phone number must be at least 9 characters."),
  region: z.string().min(0),
  city: z.string().min(1, "City is required"),
});

type PostFormFields = z.infer<typeof schema>;

const CreateOrEditPost = () => {
  // Inside CreateOrEditPost
  const navigate = useNavigate();

  // Inside CreateOrEditPost
  const { postId } = useParams();
  console.log(postId);

  const [city, setCity] = useState<string>("");
  const [suggestions, setSuggestions] = useState<City[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [debouncedCity, setDebouncedCity] = useState<string>("");
  const [isCitySelected, setIsCitySelected] = useState<boolean>(false);
  const [picture, setPicture] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<PostFormFields>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const fetchPostData = async () => {
      console.log(postId);
      if (postId) {
        console.log("postId in CreateOrEditPost component: ", postId);
        try {
          const postData = await getPostApi(postId);
          console.log("Post Data: ", postData);
          setValue("title", postData.title);
          setValue("description", postData.description);
          setValue("category", postData.category);
          setValue("phone", postData.phone);
          setValue("region", postData.region);
          setCity(postData.city);
          setValue("city", postData.city);
          if (postData.picture) {
            setImagePreview("http://localhost:3000/" + postData.picture);
            setValue("picture", postData.picture); // Keep this for internal use
          }
        } catch (error) {
          console.error("Error fetching post data:", error);
        }
      }
    };

    fetchPostData();
  }, [postId, setValue]);

  const handlePicture = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPicture(e.target.files[0]);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setImagePreview(URL.createObjectURL(file));
      handlePicture(e);
    }
  };

  const onSubmit: SubmitHandler<PostFormFields> = async (data) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("category", data.category);
      if (picture) {
        formData.append("picture", picture);
      }
      formData.append("phone", data.phone);
      formData.append("region", data.region);
      formData.append("city", data.city);

      let response: AuthResponse | undefined;
      if (postId) {
        response = await updatePostApi(postId, formData);
        console.log("Post updated successfully:", response);
      } else {
        response = await createPostApi(formData);
        console.log("Post created successfully:", response);
      }

      navigate("/");
    } catch (error) {
      console.log("Post Creation/Edit error:", error);
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedCity(city);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [city]);

  useEffect(() => {
    const fetchCities = async (query: string): Promise<void> => {
      if (!query || isCitySelected) {
        setSuggestions([]);
        return;
      }
      setLoading(true);

      const where = JSON.stringify({
        name: { $regex: `^${query}`, $options: "i" },
      });
      try {
        const response = await axios.get(
          "https://parseapi.back4app.com/classes/City",
          {
            params: {
              limit: 5,
              order: "-population",
              keys: "name",
              where,
            },
            headers: {
              "X-Parse-Application-Id":
                "3weosiutAnAaPOxJsZSr2vCMvYe03u6exstY2RE6",
              "X-Parse-Master-Key": "6OxeLaPRkf89GyFBcbopxOgojfBGO9PXtpQgjyBK",
            },
          }
        );
        setSuggestions(response.data.results || []);
      } catch (error) {
        console.error("Error fetching cities:", error);
      } finally {
        setLoading(false);
      }
    };

    if (debouncedCity) {
      fetchCities(debouncedCity);
    }
  }, [debouncedCity, isCitySelected]);

  const handleSuggestionClick = (suggestion: City): void => {
    setCity(suggestion.name);
    setValue("city", suggestion.name);
    setIsCitySelected(true);
    setSuggestions([]);
  };

  const handleCityInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setCity(e.target.value);
    setValue("city", e.target.value);
    setIsCitySelected(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center justify-center py-10 px-4 sm:px-8"
    >
      <div className="rounded-lg p-6 sm:p-8 md:p-10 lg:w-3/4 shadow-2xl w-full max-w-2xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          {postId ? "Edit your item" : "What is your item?"}
        </h1>
        <h2 className="text-gray-600 mt-2 mb-6 text-base sm:text-lg">
          {postId
            ? "Update the details of your item."
            : "Fill in all the details below to upload your item."}
        </h2>

        <div className="mb-4">
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

        <div className="mb-4">
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

        <div className="mb-4">
          <label className="block text-gray-800 font-bold mb-1">Image:</label>
          <input
            {...register("picture")}
            type="file"
            onChange={handleImageChange}
            className={`w-full px-4 py-2 text-lg border ${
              errors.picture ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {imagePreview && (
            <div className="mt-4 flex justify-center">
              <img
                src={imagePreview || "/placeholder.svg"}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-md"
              />
            </div>
          )}
          {errors.picture && typeof errors.picture.message === "string" && (
            <p className="text-red-500 text-sm mt-1">
              {errors.picture.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-800 font-bold mb-1">
            Category:
          </label>
          <select
            {...register("category")}
            className={`w-full px-4 py-2 text-lg border ${
              errors.category ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            <option value="" disabled>
              Pick a category
            </option>
            <option value="tops">
              Tops (shirts, blouses, T-shirts, tank tops)
            </option>
            <option value="bottoms">
              Bottoms (pants, jeans, skirts, shorts)
            </option>
            <option value="dresses">
              Dresses (casual, formal, maxi, mini)
            </option>
            <option value="outerwear">
              Outerwear (jackets, coats, cardigans)
            </option>
            <option value="activewear">
              Activewear (leggings, sports bras, tracksuits)
            </option>
            <option value="sleepwear">
              Sleepwear (pajamas, nightgowns, robes)
            </option>
            <option value="swimwear">
              Swimwear (bikinis, one-pieces, trunks)
            </option>
            <option value="footwear">
              Footwear (sneakers, sandals, boots, heels, flats)
            </option>
            <option value="accessories">
              Accessories (bags, hats, belts, scarves)
            </option>
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">
              {errors.category.message}
            </p>
          )}
        </div>

        <div className="mb-4">
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

        <div className="mb-4">
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
            <option value="Heifa">Heifa</option>
            <option value="HaTzafon">HaTzafon</option>
            <option value="Yerushalayim">Yerushalayim</option>
          </select>
          {errors.region && (
            <p className="text-red-500 text-sm mt-1">{errors.region.message}</p>
          )}
        </div>

        <div className="mb-4 relative">
          <label className="block text-gray-800 font-bold mb-1">City:</label>
          <input
            type="text"
            value={city}
            onChange={handleCityInputChange}
            placeholder="Start typing a city name..."
            className={`w-full px-4 py-2 text-lg border mb-1 ${
              errors.city ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {loading && <div className="text-gray-500 mt-2">Loading...</div>}
          {suggestions.length > 0 && (
            <ul className="absolute bg-white border border-gray-300 rounded-md mt-1 w-full sm:w-3/4 lg:w-1/2 max-h-48 overflow-y-auto z-10">
              {suggestions.map((suggestion) => (
                <li
                  key={suggestion.objectId}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion.name}
                </li>
              ))}
            </ul>
          )}
          {errors.city && (
            <p className="text-red-500 text-sm mt-1">City is required.</p>
          )}
        </div>

        <Button
          buttonType="submit"
          className={
            isSubmitting ? "disabled flex mx-auto mt-6" : "flex mx-auto mt-6"
          }
        >
          {isSubmitting
            ? "Submitting..."
            : postId
            ? "Update item"
            : "Upload item"}
        </Button>

        {errors.root && (
          <div className="text-red-500 text-sm mt-8">{errors.root.message}</div>
        )}
      </div>
    </form>
  );
};

export default CreateOrEditPost;
