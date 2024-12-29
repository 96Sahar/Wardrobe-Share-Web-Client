import { useNavigate } from "react-router-dom";
import WardrobeLogo from "../../assets/Wardrobe-Logo.png";

const SplashScreen = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className=" motion-opacity-in-[0%] motion-duration-[2000ms] motion-delay-[10ms] motion-duration-[1333ms]/opacity motion-delay-[0ms]/opacity motion-ease-linear flex flex-col items-center justify-center h-screen motion-scale-in-[0.1] space-y-4">
        <img src={WardrobeLogo} alt="WardrobeLogo" className="h-32 w-96" />
        <div className="bg-inherit text-center py-4">
          <div className="font-bold">
            Welcome to Wardrobe Share – the community for sharing <br />
            clothes and reducing waste!
          </div>
          <div className="py-4">
            Our mission is to give new life to unused clothes and keep them
            <br />
            out of landfills.
          </div>
          <div>Got something you don’t wear any more? Don’t toss it!</div>
          <div className="py-2">
            As the saying goes, "One man’s trash is another man’s treasure."
            <br />
            Let’s make it a reality together.
          </div>

          <span className=" flex item-center mt-10 justify-center">
            <button
              onClick={() => {
                navigate("/mainLogin");
              }}
            >
              Continue
            </button>
          </span>
        </div>
      </div>
    </>
  );
};

export default SplashScreen;
