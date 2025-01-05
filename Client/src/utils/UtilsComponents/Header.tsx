import { useNavigate } from "react-router-dom";
import Button from "./Button";
import WardrobeLogo from "../../assets/Wardrobe-Logo.png";

const Header = () => {
  const navigate = useNavigate();

  return (
    <>
      <header className="flex justify-between items-center p-6 border-b-[3px] border-slate-700 sticky top-0 z-50 bg-gray-200 text-primary">
        <img
          src={WardrobeLogo}
          alt="WardrobeLogo"
          className="h-14 hover:cursor-pointer"
          onClick={() => navigate("/")}
        />
        <div className="flex items-center space-x-2">
          <Button onClick={() => navigate("/LoginAndRegistration")}>
            Login
          </Button>
        </div>
      </header>
    </>
  );
};

export default Header;
