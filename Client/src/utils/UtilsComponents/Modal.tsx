import React, { useEffect, useRef } from "react";
import Button from "./Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText: string;
  cancelText: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText,
  cancelText,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md mx-4 transform transition-all"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-3 text-center">
          {title}
        </h2>
        <p className="text-gray-600 mb-6 text-center">{description}</p>
        <div className="flex justify-center gap-4">
          <Button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            {cancelText}
          </Button>
          <Button
            onClick={onConfirm}
            className="px-6 py-2.5 rounded-full text-white bg-gradient-to-r from-teal-600 to-green-500 hover:from-teal-700 hover:to-green-600 transition-colors"
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
