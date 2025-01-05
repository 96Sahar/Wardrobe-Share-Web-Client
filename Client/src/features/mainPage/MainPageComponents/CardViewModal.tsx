import React, { useEffect } from "react";
import { CardData } from "../DummyData";
import Button from "../../../utils/UtilsComponents/Button";

interface CardViewModalProps {
  cardDetails: CardData;
  closeModal: () => void;
}
const CardViewModal: React.FC<CardViewModalProps> = ({
  cardDetails,
  closeModal,
}) => {
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };
    document.addEventListener("keydown", handleEscKey);
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [closeModal]);
  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
      onClick={closeModal}
    >
      <div
        className="relative p-6 w-full max-w-4xl max-h-full"
        onClick={handleContentClick}
      >
        <div className="relative bg-white rounded-lg shadow-lg dark:bg-gray-800">
          <div className="flex p-6">
            <div className="flex-1 space-y-6 border">
              <img
                src={cardDetails.picture}
                alt={cardDetails.description}
                className="w-full h-80 object-fill rounded-lg shadow-md"
              />

              <div className="space-y-4">
                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                  <strong>Description:</strong> {cardDetails.description}
                </p>
                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                  <strong>Location:</strong> {cardDetails.location}
                </p>
                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                  <strong>Contact:</strong> {cardDetails.contact}
                </p>
              </div>
            </div>

            <div className="w-[4px] h-full mx-8"></div>

            <div className="flex-1 space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Comments
              </h2>

              {/* Example Comments */}
              <div className="space-y-4">
                <div className="p-4 border border-black rounded-lg shadow-md dark:bg-gray-900">
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>John Doe:</strong> Great item!
                  </p>
                </div>
                <div className="p-4 border border-black rounded-lg shadow-md dark:bg-gray-900">
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>Jane Smith:</strong> Interested in this, please
                    contact me!
                  </p>
                </div>
                <textarea
                  rows={4}
                  placeholder="Write a comment..."
                  className="w-full p-3 border border-gray-500 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-gray-500 dark:bg-gray-900 dark:text-white dark:border-gray-700"
                ></textarea>
                <div className="flex flex-col">
                  <Button buttonType="submit">Add Comment</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardViewModal;
