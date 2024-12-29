import React from "react";
import Button from "../../../utils/Components/Button";

interface LoginProps {
  loginData: { email: string; password: string };
  setLoginData: React.Dispatch<
    React.SetStateAction<{ email: string; password: string }>
  >;
  onSubmit: () => void;
}

const Login: React.FC<LoginProps> = ({ loginData, setLoginData, onSubmit }) => {
  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <div className="text-center mb-8">
        <h2 className="text-xl font-semibold">Welcome to Wardrobe</h2>
      </div>

      <form
        className="flex flex-col items-center space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <div className="flex flex-col">
          <label htmlFor="email" className="mb-2 text-gray-800 font-medium">
            Email:
          </label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Email address"
            className="bg-neutral-100 border border-gray-800 rounded px-3 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-gray-800 placeholder:text-center"
            value={loginData.email}
            onChange={(e) =>
              setLoginData((prev) => ({ ...prev, email: e.target.value }))
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
            className="bg-neutral-100 border border-gray-800 rounded px-3 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-gray-800 placeholder:text-center"
            value={loginData.password}
            onChange={(e) =>
              setLoginData((prev) => ({ ...prev, password: e.target.value }))
            }
          />
        </div>

        <Button>Login</Button>
      </form>
    </div>
  );
};

export default Login;
