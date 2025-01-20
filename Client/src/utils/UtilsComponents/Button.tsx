import React from "react";
import clsx from "clsx"; // Install using: npm install clsx

interface ButtonProps {
  className?: string;
  color?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  buttonType?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  className,
  color = "white",
  children,
  onClick,
  buttonType = "button",
}) => {
  const handleClick = () => {
    if (onClick) {
      console.log("Button clicked");
      console.log(onClick());
    }
  };
  return (
    <button
      type={buttonType}
      style={{ backgroundColor: color }}
      className={clsx(
        "border border-black rounded-full px-6 lg:px-12 py-2 bg-gradient-to-br from-primary to-secondary text-white",
        className
      )}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default Button;
