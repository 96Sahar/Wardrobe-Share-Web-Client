import React from "react";
interface Button {
  color?: string;
  children?: React.ReactNode;
}
const Button: React.FC<Button> = ({ color = "white", children }) => {
  return (
    <button
      style={{ backgroundColor: color }}
      className="border border-black rounded-full px-4 py-2 bg-"
    >
      {children}
    </button>
  );
};

export default Button;
