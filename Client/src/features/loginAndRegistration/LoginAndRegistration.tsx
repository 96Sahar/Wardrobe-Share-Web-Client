import { useState } from "react";
import WardrobeLogo from "../../assets/Wardrobe-Logo.png";
import Login from "./LoginAndRegistraionComponents/Login";
import Register from "./LoginAndRegistraionComponents/Register";
import { LoginCredentials, AuthResponse } from "../../services/userService";
import { Navigate } from "react-router-dom";

const LoginAndRegistration = () => {
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
    localStorage.setItem("user", JSON.stringify(userData));
  };

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-center h-screen bg-gray-100">
      <div className="flex flex-col items-center justify-center space-y-4 md:space-y-0 md:flex-1 md:mb-0">
        <img
          src={WardrobeLogo}
          alt="WardrobeLogo"
          className="h-16 md:h-32 w-auto"
        />
      </div>

      <div className="hidden md:block w-[2px] h-full bg-slate-700"></div>

      <div className="flex flex-col items-center justify-center w-full px-6 md:flex-1">
        {isLogin ? (
          <>
            <Login
              loginData={loginData}
              setLoginData={setLoginData}
              onLoginSuccess={handleLoginSuccess}
            />
            <button
              onClick={handleIsLogin}
              className="underline text-primary mt-2"
            >
              Don't have an account yet?
            </button>
          </>
        ) : (
          <>
            <Register />
            <button
              onClick={handleIsLogin}
              className="underline text-primary mt-2"
            >
              Already have an account?
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginAndRegistration;
