import React from "react";
import { useNavigate } from "react-router-dom";
interface Button {
  color?: string;
  children?: React.ReactNode;
  nav?: string;
}
const Button: React.FC<Button> = ({ color = "white", children, nav }) => {
  const navigate = useNavigate();
  return (
    <button
      style={{ backgroundColor: color }}
      className="border border-black rounded-full px-4 py-2 bg-"
      onClick={nav ? () => navigate(nav) : undefined}
    >
      {children}
    </button>
  );
};

export default Button;
