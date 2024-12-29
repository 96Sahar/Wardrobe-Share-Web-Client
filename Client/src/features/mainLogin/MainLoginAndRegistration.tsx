import { useState } from "react";
import WardrobeLogo from "../../assets/Wardrobe-Logo.png";
import Login from "./Components/Login";
import Register from "./Components/Register";

const MainLoginAndRegistration = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleIsLogin = () => {
    setIsLogin((isLogin) => !isLogin);
  };

  return (
    <div className="flex items-center h-screen">
      <div className="flex-1 flex justify-center items-center">
        <img src={WardrobeLogo} alt="WardrobeLogo" className="h-32 w-96" />
      </div>

      <div className="w-[2px] h-full bg-slate-700"></div>

      {isLogin ? (
        <>
          <div className="flex-1 flex flex-col justify-center items-center space-y-4">
            <Login />
            <button
              onClick={handleIsLogin}
              className="flex flex-col justify-center underline"
            >
              Don't have an account yet?
            </button>
          </div>
        </>
      ) : (
        <Register />
      )}
    </div>
  );
};

export default MainLoginAndRegistration;
