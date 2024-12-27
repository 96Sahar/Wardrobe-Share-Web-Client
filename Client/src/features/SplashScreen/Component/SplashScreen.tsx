import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import WardrobeLogo from "../../../assets/Wardrobe-Logo.png";

const SplashScreen = () => {
  const [proceedAnimation, setProceedAnimation] = useState(false);
  const navigate = useNavigate(); // Initialize navigate function

  const handleProceedAnimation = async () => {
    setProceedAnimation(true); // Set animation state (you can use it for other purposes)
    navigate("/textScreen"); // Navigate to TextScreen after the animation (if any) // Optional: Adjust the time delay as needed
  };

  return (
    <>
      {!proceedAnimation && (
        <div className="motion-opacity-in-[0%] motion-duration-[2000ms] motion-delay-[10ms] motion-duration-[1333ms]/opacity motion-delay-[0ms]/opacity motion-ease-linear flex flex-col items-center justify-center h-screen motion-scale-in-[0.1] space-y-4">
          <img src={WardrobeLogo} alt="WardrobeLogo" />
          <button
            className="px-4 py-2 bg-inherit"
            onClick={handleProceedAnimation}
          >
            Continue
          </button>
        </div>
      )}
    </>
  );
};

export default SplashScreen;
