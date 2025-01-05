import { useNavigate } from "react-router-dom";
import Button from "./Button";
import WardrobeLogo from "../../assets/Wardrobe-Logo.png";

const Header = () => {
  const navigate = useNavigate();

  return (
    <>
      <header className="flex justify-between items-center p-4 border-b border-slate-700 sticky top-0 z-50">
        <div className="flex items-center space-x-2">
          <Button onClick={() => navigate("/LoginAndRegistration")}>
            Login
          </Button>
        </div>
        <img src={WardrobeLogo} alt="WardrobeLogo" className="h-8 w-24" />
      </header>
    </>
  );
};

export default Header;
