import { useState } from "react";
import WardrobeLogo from "../../assets/Wardrobe-Logo.png";
import Login from "./LoginAndRegistraionComponents/Login";
import Register from "./LoginAndRegistraionComponents/Register";
import {
  LoginCredentials,
  AuthResponse,
} from "../../services/interfaceService";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import GoogleLogin from "./LoginAndRegistraionComponents/GoogleLogin";
import { toast } from "react-toastify";
import axios, { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { getServerUrl } from "../../services/httpClient";

const LoginAndRegistration = () => {
  const navigate = useNavigate();
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
    console.log(userData);
    const expiresIn = 50 * 60 * 1000;
    const expiration = new Date(Date.now() + expiresIn).toISOString();
    Cookies.set("AuthExpiration", expiration);
    Cookies.set("userInfo", JSON.stringify(userData));
    Cookies.set("authToken", userData.accessToken, {
      sameSite: "strict",
    });
    Cookies.set("refreshToken", userData.refreshToken, {
      sameSite: "strict",
    });
  };

  const loginWithGoogle = async (authResult: any) => {
    if (authResult["code"]) {
      try {
        const response: Promise<AxiosResponse> = axios.post(
          `${getServerUrl()}user/googleLogin`,
          {
            code: authResult["code"],
          }
        );
        response
          .then((resolvedResponse) => {
            const data = {
              username: resolvedResponse.data.user.username,
              _id: resolvedResponse.data.user._id,
              accessToken: resolvedResponse.data.accessToken,
              refreshToken: resolvedResponse.data.refreshToken,
            };
            handleLoginSuccess(data);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
        toast.success("Google login successful");
      } catch (error) {
        console.error(error);
        toast.error("Google login failed");
      }
    } else {
      console.error(authResult);
      toast.error("Google login failed");
    }
  };
  

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen">
      <div className={`flex flex-col items-center justify-center md:flex-1 md:mb-0 md:mt-0 ${ !isLogin ? "mt-8" : ""}`}>
        <img
          src={WardrobeLogo}
          alt="WardrobeLogo"
          className="h-16 md:h-32 w-auto"
          onClick={() => navigate("/")}
        />
      </div>
  
      <div className="hidden md:block w-[2px] h-screen bg-slate-700"></div>
  
      <div className="flex flex-col items-center justify-center w-full px-6 md:flex-1">
        {isLogin ? (
          <>
            <Login
              loginData={loginData}
              setLoginData={setLoginData}
              onLoginSuccess={handleLoginSuccess}
            />
            <button onClick={handleIsLogin} className="underline text-primary">
              Don't have an account yet?
            </button>
          </>
        ) : (
          <>
            <Register />
            <button onClick={handleIsLogin} className="underline text-primary">
              Already have an account?
            </button>
          </>
        )}
        <div className="flex">
          <span className="flex flex-col items-center justify-center w-full px-6 md:flex-1 mt-1 text-lg font-bold">
            or
          </span>
        </div>
  
        <GoogleLogin authResponse={loginWithGoogle} />
      </div>
    </div>
  );  
};

export default LoginAndRegistration;
