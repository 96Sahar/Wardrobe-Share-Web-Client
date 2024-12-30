import React from "react";
import Button from "../../../utils/Components/Button";

interface RegisterProps {
  registrationData: {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    confirmPassword: string;
  };
  setRegistrationData: React.Dispatch<
    React.SetStateAction<{
      firstName: string;
      lastName: string;
      username: string;
      password: string;
      confirmPassword: string;
    }>
  >;
  onSubmit: () => void;
}

const Register: React.FC<RegisterProps> = ({
  registrationData,
  setRegistrationData,
  onSubmit,
}) => {
  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <div className="text-center mb-8">
        <h2 className="text-xl font-semibold">Create a new account</h2>
      </div>

      <form
        className="flex flex-col items-center space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <div className="flex justify-between space-x-4 w-full max-w-md">
          <div className="flex flex-col w-1/4">
            <label
              htmlFor="firstName"
              className="mb-2 text-gray-800 font-medium"
            >
              First Name:
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="First name"
              className="bg-neutral-100 border border-gray-800 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-800 placeholder:text-center"
              value={registrationData.firstName}
              onChange={(e) =>
                setRegistrationData((prev) => ({
                  ...prev,
                  firstName: e.target.value,
                }))
              }
            />
          </div>

          <div className="flex flex-col w-1/4">
            <label
              htmlFor="lastName"
              className="mb-2 text-gray-800 font-medium"
            >
              Last Name:
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Last name"
              className="bg-neutral-100 border border-gray-800 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-800 placeholder:text-center"
              value={registrationData.lastName}
              onChange={(e) =>
                setRegistrationData((prev) => ({
                  ...prev,
                  lastName: e.target.value,
                }))
              }
            />
          </div>
        </div>

        <div className="flex flex-col w-full max-w-md">
          <label htmlFor="username" className="mb-2 text-gray-800 font-medium">
            Username:
          </label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            className="bg-neutral-100 border border-gray-800 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-800 placeholder:text-center"
            value={registrationData.username}
            onChange={(e) =>
              setRegistrationData((prev) => ({
                ...prev,
                username: e.target.value,
              }))
            }
          />
        </div>

        <div className="flex flex-col w-full max-w-md">
          <label htmlFor="password" className="mb-2 text-gray-800 font-medium">
            Password:
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className="bg-neutral-100 border border-gray-800 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-800 placeholder:text-center"
            value={registrationData.password}
            onChange={(e) =>
              setRegistrationData((prev) => ({
                ...prev,
                password: e.target.value,
              }))
            }
          />
        </div>

        <div className="flex flex-col w-full max-w-md">
          <label
            htmlFor="confirmPassword"
            className="mb-2 text-gray-800 font-medium"
          >
            Confirm Password:
          </label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Confirm password"
            className="bg-neutral-100 border border-gray-800 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-800 placeholder:text-center"
            value={registrationData.confirmPassword}
            onChange={(e) =>
              setRegistrationData((prev) => ({
                ...prev,
                confirmPassword: e.target.value,
              }))
            }
          />
        </div>

        <Button buttonType="submit">Sign up</Button>
      </form>
    </div>
  );
};

export default Register;
