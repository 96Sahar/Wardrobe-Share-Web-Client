import Button from "../../../utils/UtilsComponents/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  register as registerApi,
  UserData,
  AuthResponse,
} from "../../../utils/api";
import { useState } from "react";

const schema = z
  .object({
    f_name: z.string().min(2, "First name must be at least 2 characters"),
    l_name: z.string().min(2, "Last name must be at least 2 characters"),
    username: z
      .string()
      .regex(/^[a-zA-Z0-9]+$/, "Username can only contain letters and numbers"),
    email: z.string().email("Please provide a valid email address"),
    password: z
      .string()
      .min(4, "Password must be at least 4 characters")
      .regex(/^[a-zA-Z0-9]+$/, "Password can only contain letters and numbers"),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

type RegisterField = z.infer<typeof schema>;

const Register = () => {
  const [registrationError, setRegistrationError] = useState<string | null>(
    null
  );
  const [registrationSuccess, setRegistrationSuccess] =
    useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterField>({
    defaultValues: {
      f_name: "",
      l_name: "",
      username: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<RegisterField> = async (data) => {
    try {
      setRegistrationError(null);
      const userData: UserData = {
        username: data.username,
        password: data.password,
        email: data.email,
        f_name: data.f_name,
        l_name: data.l_name,
      };
      const response: AuthResponse = await registerApi(userData);
      console.log("Registration successful:", response);
      setRegistrationSuccess(true);
    } catch (error: unknown) {
      console.error("Registration error:", error);
      setRegistrationError(
        error instanceof Error
          ? error.message
          : "An error occurred during registration"
      );
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <div className="text-center mb-8">
        <h2 className="text-xl font-semibold">Create a new account</h2>
      </div>

      <form
        className="flex flex-col items-center space-y-4"
        onSubmit={handleSubmit(onSubmit)}
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
              {...register("f_name")}
              type="text"
              name="f_name"
              id="f_name"
              placeholder="First name"
              className="bg-neutral-100 border border-gray-800 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-800 placeholder:text-center"
            />
            {errors.f_name && (
              <div className="text-red-500">{errors.f_name.message}</div>
            )}
          </div>

          <div className="flex flex-col w-1/4">
            <label
              htmlFor="lastName"
              className="mb-2 text-gray-800 font-medium"
            >
              Last Name:
            </label>
            <input
              {...register("l_name")}
              type="text"
              name="l_name"
              id="l_name"
              placeholder="Last name"
              className="bg-neutral-100 border border-gray-800 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-800 placeholder:text-center"
            />
            {errors.l_name && (
              <div className="text-red-500">{errors.l_name.message}</div>
            )}
          </div>
        </div>

        <div className="flex flex-col w-full max-w-md">
          <label htmlFor="username" className="mb-2 text-gray-800 font-medium">
            Username:
          </label>
          <input
            {...register("username")}
            type="text"
            id="username"
            placeholder="Username"
            className="bg-neutral-100 border border-gray-800 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-800 placeholder:text-center"
          />
          {errors.username && (
            <div className="text-red-500">{errors.username.message}</div>
          )}
        </div>

        <div className="flex flex-col w-full max-w-md">
          <label htmlFor="email" className="mb-2 text-gray-800 font-medium">
            Email:
          </label>
          <input
            {...register("email")}
            type="email"
            id="email"
            placeholder="Email"
            className="bg-neutral-100 border border-gray-800 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-800 placeholder:text-center"
          />
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}
        </div>

        <div className="flex flex-col w-full max-w-md">
          <label htmlFor="password" className="mb-2 text-gray-800 font-medium">
            Password:
          </label>
          <input
            {...register("password")}
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className="bg-neutral-100 border border-gray-800 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-800 placeholder:text-center"
          />
          {errors.password && (
            <div className="text-red-500">{errors.password.message}</div>
          )}
        </div>

        <div className="flex flex-col w-full max-w-md">
          <label
            htmlFor="confirm_password"
            className="mb-2 text-gray-800 font-medium"
          >
            Confirm Password:
          </label>
          <input
            {...register("confirm_password")}
            type="password"
            name="confirm_password"
            placeholder="Confirm password"
            className="bg-neutral-100 border border-gray-800 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-800 placeholder:text-center"
          />
          {errors.confirm_password && (
            <div className="text-red-500">
              {errors.confirm_password.message}
            </div>
          )}
        </div>

        <Button buttonType="submit" className={isSubmitting ? "disabled" : ""}>
          {isSubmitting ? "Submitting" : "Sign up"}
        </Button>

        {registrationError && (
          <div className="text-red-500">{registrationError}</div>
        )}
        {registrationSuccess && (
          <div className="text-green-500">
            Registration successful! You can now log in.
          </div>
        )}
      </form>
    </div>
  );
};

export default Register;
