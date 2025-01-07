import { useState } from "react";
import WardrobeLogo from "../../assets/Wardrobe-Logo.png";
import Login from "./LoginAndRegistraionComponents/Login";
import Register from "./LoginAndRegistraionComponents/Register";
import { LoginCredentials, AuthResponse } from "../../utils/api";

const MainLoginAndRegistration = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loginData, setLoginData] = useState<LoginCredentials>({
    username: "",
    password: "",
  });
  const [user, setUser] = useState<AuthResponse | null>(null);

  const handleIsLogin = () => {
    setIsLogin((isLogin) => !isLogin);
  };

  const handleLoginSuccess = (userData: AuthResponse) => {
    setUser(userData);
    // You can also store the user data in localStorage or a global state management solution like Redux
    localStorage.setItem("user", JSON.stringify(userData));
  };

  if (user) {
    return (
      <div>
        <h1>Welcome, {user.username}!</h1>
        {/* Add your authenticated app content here */}
      </div>
    );
  }

  return (
    <div className="flex items-center h-screen">
      <div className="flex-1 flex justify-center items-center">
        <img src={WardrobeLogo} alt="WardrobeLogo" className="h-32 w-96" />
      </div>

      <div className="w-[2px] h-full bg-slate-700"></div>

      {isLogin ? (
        <div className="flex-1 flex flex-col justify-center items-center space-y-4">
          <Login
            loginData={loginData}
            setLoginData={setLoginData}
            onLoginSuccess={handleLoginSuccess}
          />
          <button
            onClick={handleIsLogin}
            className="flex flex-col justify-center underline"
          >
            Don't have an account yet?
          </button>
        </div>
      ) : (
        <div className="flex-1 flex flex-col justify-center items-center space-y-4">
          <Register />
          <button
            onClick={handleIsLogin}
            className="flex flex-col justify-center underline"
          >
            Already have an account
          </button>
        </div>
      )}
    </div>
  );
};

export default MainLoginAndRegistration;
