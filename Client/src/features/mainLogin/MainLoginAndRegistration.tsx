import WardrobeLogo from "../../assets/Wardrobe-Logo.png";
import Login from "./Components/Login";
const MainLoginAndRegistration = () => {
  return (
    <div className="flex items-center h-screen">
      <div className="flex-1 flex justify-center items-center">
        <img src={WardrobeLogo} alt="WardrobeLogo" className="h-32 w-96" />
      </div>

      <div className="w-[2px] h-full bg-slate-700"></div>

      <Login />
    </div>
  );
};

export default MainLoginAndRegistration;
