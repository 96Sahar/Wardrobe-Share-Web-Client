import React from "react";
interface ButtonProps {
  color: string;
  children: React.ReactNode;
}
const Button: React.FC<ButtonProps> = ({ color = "red", children }) => {
  return <button style={{ backgroundColor: color }}>{children}</button>;
};

export default Button;
