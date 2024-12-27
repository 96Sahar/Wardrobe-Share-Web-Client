import WardrobeLogo from "../../../assets/Wardrobe-Logo.png";

const TextScreen = () => {
  return (
    <>
      <div className=" motion-translate-x-in-[25%] motion-translate-y-in-[0%] flex flex-col items-center justify-center space-y-4 text-center">
        <img src={WardrobeLogo} alt="WardrobeLogo" className="h-32 w-96" />
        <div className="py-8 bg-inherit">
          <div className="font-bold">
            Welcome to Wardrobe Share – the community for sharing <br />
            clothes and reducing waste!
          </div>
          <div className="py-4">
            Our mission is to give new life to unused clothes and keep them
            <br />
            out of landfills.
          </div>
          <div className="py-2">
            Got something you don’t wear any more? Don’t toss it!
          </div>
          <div className="py-2">
            As the saying goes, "One man’s trash is another man’s treasure."
            <br />
            Let’s make it a reality together."
          </div>
        </div>
      </div>
    </>
  );
};

export default TextScreen;
