import React, { useState } from "react";
import Button from "../../../utils/UtilsComponents/Button";
import {
  LoginCredentials,
  AuthResponse,
} from "../../../services/interfaceService";
import { login as loginApi } from "../../../services/userService";

interface LoginProps {
  loginData: LoginCredentials;
  setLoginData: React.Dispatch<React.SetStateAction<LoginCredentials>>;
  onLoginSuccess: (userData: AuthResponse) => void;
}

const Login: React.FC<LoginProps> = ({
  loginData,
  setLoginData,
  onLoginSuccess,
}) => {
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoginError(null);
      const response: AuthResponse = await loginApi(loginData);
      console.log("Login successful:", response);
      onLoginSuccess(response);
    } catch (error: unknown) {
      console.error("Login error:", error);
      setLoginError(
        error instanceof Error
          ? error.message
          : "An error occurred during login"
      );
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-center items-center px-4 py-4">
      <div className="text-center mb-8">
        <h2 className="text-xl font-semibold">Welcome to Wardrobe</h2>
      </div>

      <form
        className="flex flex-col items-center space-y-4"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col">
          <label htmlFor="username" className="mb-2 text-gray-800 font-medium">
            Username:
          </label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            className="bg-neutral-100 border border-gray-800 rounded px-3 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-gray-800 placeholder:text-center"
            value={loginData.username}
            onChange={(e) =>
              setLoginData((prev) => ({ ...prev, username: e.target.value }))
            }
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="mb-2 text-gray-800 font-medium">
            Password:
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className="bg-neutral-100 border border-gray-800 rounded px-3 py-2 mb-2 w-64 focus:outline-none focus:ring-2 focus:ring-gray-800 placeholder:text-center"
            value={loginData.password}
            onChange={(e) =>
              setLoginData((prev) => ({ ...prev, password: e.target.value }))
            }
          />
        </div>
        <Button buttonType="submit">Login</Button>

        {loginError && <div className="text-red-500">{loginError}</div>}
      </form>
    </div>
  );
};

export default Login;
