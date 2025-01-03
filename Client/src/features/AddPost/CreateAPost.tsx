import { useRef, useState, useEffect } from "react";

const CreateAPost = () => {
  const inputRef = useRef(null);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageClick = () => {
    inputRef.current.click(); // Programmatically trigger the input click
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const previewURL = URL.createObjectURL(file);
      setImagePreview(previewURL);
    }
  };

  // Clean up object URL to prevent memory leaks
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  return (
    <div
      onClick={handleImageClick}
      style={{ border: "1px solid gray", padding: "10px", cursor: "pointer" }}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleImageClick();
        }
      }}
    >
      {imagePreview ? (
        <img src={imagePreview} alt="Uploaded" className="h-24 w-24" />
      ) : (
        <div>Add a photo</div>
      )}
      <input
        type="file"
        ref={inputRef}
        onChange={handleImageChange}
        style={{ display: "none" }} // Hide the input visually
      />
    </div>
  );
};

export default CreateAPost;
