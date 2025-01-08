import Button from "../../../utils/UtilsComponents/Button";
import React, { useState } from "react";

interface City {
  objectId: string;
  name: string;
}

const CreatePost: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [category, setCategory] = useState<string>("");
  const [region, setRegion] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [suggestions, setSuggestions] = useState<City[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const fetchCities = async (query: string): Promise<void> => {
    if (!query) {
      setSuggestions([]);
      return;
    }
    setLoading(true);
    const where = encodeURIComponent(
      JSON.stringify({ name: { $regex: `^${query}`, $options: "i" } })
    );
    try {
      const response = await fetch(
        `https://parseapi.back4app.com/classes/City?limit=5&order=-population&keys=name&where=${where}`,
        {
          headers: {
            "X-Parse-Application-Id":
              "3weosiutAnAaPOxJsZSr2vCMvYe03u6exstY2RE6",
            "X-Parse-Master-Key": "6OxeLaPRkf89GyFBcbopxOgojfBGO9PXtpQgjyBK",
          },
        }
      );
      const data = await response.json();
      setSuggestions(data.results || []);
    } catch (error) {
      console.error("Error fetching cities:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (): void => {
    const newErrors: Record<string, boolean> = {
      title: !title.trim(),
      description: !description.trim(),
      image: !image,
      category: !category,
      region: !region,
      city: !city.trim(),
    };
    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      console.error("Please fill all required fields.");
    } else {
      console.log({ title, description, image, category, region, city });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setCity(value);
    fetchCities(value);
  };

  const handleSuggestionClick = (suggestion: City): void => {
    setCity(suggestion.name);
    setSuggestions([]);
  };

  return (
    <div className="flex flex-col items-center justify-center py-10 px-4 sm:px-8">
      <div className="bg-zinc-200 rounded-lg p-6 sm:p-8 md:p-10 lg:w-3/4 shadow-lg w-full max-w-4xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          What is your item?
        </h1>
        <h2 className="text-gray-600 mt-2 mb-6 text-base sm:text-lg">
          Fill in all the details below to upload your item.
        </h2>

        {/* Title */}
        <div className="mb-4">
          <label className="block text-gray-800 font-bold mb-1">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="For example: Vintage dress"
            className={`w-full sm:w-3/4 lg:w-1/2 px-4 py-2 text-lg border ${
              errors.title ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">Title is required.</p>
          )}
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-gray-800 font-bold mb-1">
            Description:
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Tell us about the brand, size, condition, etc."
            className={`w-full sm:w-3/4 lg:w-1/2 px-4 py-2 text-lg border ${
              errors.description ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              Description is required.
            </p>
          )}
        </div>

        {/* Image */}
        <div className="mb-4">
          <label className="block text-gray-800 font-bold mb-1">Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            className={`w-full sm:w-3/4 lg:w-1/2 px-4 py-2 text-lg border ${
              errors.image ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.image && (
            <p className="text-red-500 text-sm mt-1">Image is required.</p>
          )}
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="block text-gray-800 font-bold mb-1">
            Category:
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={`w-full sm:w-3/4 lg:w-1/2 px-4 py-2 text-lg border ${
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
            <p className="text-red-500 text-sm mt-1">Category is required.</p>
          )}
        </div>

        {/* Region */}
        <div className="mb-4">
          <label className="block text-gray-800 font-bold mb-1">Region:</label>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className={`w-full sm:w-3/4 lg:w-1/2 px-4 py-2 text-lg border ${
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
            <p className="text-red-500 text-sm mt-1">Region is required.</p>
          )}
        </div>

        {/* City */}
        <div className="mb-4 relative">
          <label className="block text-gray-800 font-bold mb-1">City:</label>
          <input
            type="text"
            value={city}
            onChange={handleInputChange}
            placeholder="Start typing a city name..."
            className={`w-full sm:w-3/4 lg:w-1/2 px-4 py-2 text-lg border ${
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

        {/* Submit Button */}
        <div className="mt-8 flex">
          <Button onClick={handleSubmit}>Upload item</Button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
