import React from "react";
import { Oval } from "react-loader-spinner";

const LoadingSpinner: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center mx-auto">
    <Oval
      height={50}
      width={50}
      color="black"
      secondaryColor="#D1E8FF"
      strokeWidth={2}
      strokeWidthSecondary={2}
      ariaLabel="loading"
    />
  </div>
);

export default LoadingSpinner;
