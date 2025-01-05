import React, { useState } from "react";
import { FaImage } from "react-icons/fa";

interface Goal {
  title: string;
  text: string;
  pictures: string[];
}

const Goals: React.FC = () => {
  const [goal, setGoal] = useState<Goal>({
    title: "",
    text: "",
    pictures: [],
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newPictures = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setGoal((prev) => ({
        ...prev,
        pictures: [...prev.pictures, ...newPictures],
      }));
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-semibold text-slate-700">My Goals</h2>
      <div className="border border-slate-300 rounded-lg p-4 space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={goal.title}
          onChange={(e) =>
            setGoal((prev) => ({ ...prev, title: e.target.value }))
          }
          className="w-full p-2 border border-slate-300 rounded"
        />
        <div className="flex items-center space-x-2">
          <label className="cursor-pointer">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <div className="flex items-center space-x-2 text-slate-700">
              <FaImage className="text-xl" />
              <span>Add Pictures</span>
            </div>
          </label>
          {goal.pictures.length > 0 && (
            <div className="flex space-x-2">
              {goal.pictures.map((pic, index) => (
                <img
                  key={index}
                  src={pic}
                  alt={`Goal picture ${index + 1}`}
                  className="h-10 w-10 object-cover rounded"
                />
              ))}
            </div>
          )}
        </div>
        <textarea
          placeholder="Text"
          value={goal.text}
          onChange={(e) =>
            setGoal((prev) => ({ ...prev, text: e.target.value }))
          }
          className="w-full p-2 border border-slate-300 rounded h-24"
        />
      </div>
    </div>
  );
};

export default Goals;
