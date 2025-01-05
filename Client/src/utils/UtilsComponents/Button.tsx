import React from "react";
interface Button {
  color?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  buttonType?: "button" | "submit" | "reset" | undefined;
}

const Button: React.FC<Button> = ({
  color = "white",
  children,
  onClick,
  buttonType = "button",
}) => {
  return (
    <button
      type={buttonType}
      style={{ backgroundColor: color }}
      className="border border-black rounded-full px-14 py-2"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
