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
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen">
      {/* Logo Section */}
      <div className="flex flex-col items-center justify-center space-y-4 md:space-y-0 md:flex-1 md:mb-0 pt-5">
        <img
          src={WardrobeLogo}
          alt="WardrobeLogo"
          className="h-16 md:h-32 w-auto"
        />
      </div>

      {/* Divider (Visible only on Desktop) */}
      <div className="hidden md:block w-[2px] h-full bg-slate-700"></div>

      {/* Login or Registration Section */}
      <div className="flex flex-col items-center justify-center w-full px-6 pb-5 md:flex-1">
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

export default MainLoginAndRegistration;
