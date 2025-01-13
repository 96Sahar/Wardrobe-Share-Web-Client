import { useState } from "react";
import Button from "../../../utils/UtilsComponents/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { register as registerApi } from "../../../services/userService";
import { UserData, AuthResponse } from "../../../services/interfaceService";
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
    <div className="flex flex-col justify-center items-center px-4 py-4 sm:px-8">
      <div className="text-center mb-3">
        <h2 className="text-lg sm:text-xl font-semibold">
          Create a new account
        </h2>
      </div>

      <form
        className="grid grid-cols-1 gap-4 w-full max-w-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="f_name" className="mb-2 text-gray-800 font-medium">
              First Name:
            </label>
            <input
              {...register("f_name")}
              type="text"
              id="f_name"
              placeholder="First name"
              className="bg-neutral-100 border border-gray-800 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-800 placeholder:text-center"
            />
            {errors.f_name && (
              <div className="text-red-500">{errors.f_name.message}</div>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="l_name" className="mb-2 text-gray-800 font-medium">
              Last Name:
            </label>
            <input
              {...register("l_name")}
              type="text"
              id="l_name"
              placeholder="Last name"
              className="bg-neutral-100 border border-gray-800 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-800 placeholder:text-center"
            />
            {errors.l_name && (
              <div className="text-red-500">{errors.l_name.message}</div>
            )}
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="username" className="mb-2 text-gray-800 font-medium">
            Username:
          </label>
          <input
            {...register("username")}
            type="text"
            id="username"
            placeholder="Username"
            className="bg-neutral-100 border border-gray-800 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-800 placeholder:text-center"
          />
          {errors.username && (
            <div className="text-red-500">{errors.username.message}</div>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className="mb-2 text-gray-800 font-medium">
            Email:
          </label>
          <input
            {...register("email")}
            type="email"
            id="email"
            placeholder="Email"
            className="bg-neutral-100 border border-gray-800 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-800 placeholder:text-center"
          />
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="mb-2 text-gray-800 font-medium">
            Password:
          </label>
          <input
            {...register("password")}
            type="password"
            id="password"
            placeholder="Password"
            className="bg-neutral-100 border border-gray-800 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-800 placeholder:text-center"
          />
          {errors.password && (
            <div className="text-red-500">{errors.password.message}</div>
          )}
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="confirm_password"
            className="mb-2 text-gray-800 font-medium"
          >
            Confirm Password:
          </label>
          <input
            {...register("confirm_password")}
            type="password"
            id="confirm_password"
            placeholder="Confirm password"
            className="bg-neutral-100 border border-gray-800 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-800 placeholder:text-center"
          />
          {errors.confirm_password && (
            <div className="text-red-500">
              {errors.confirm_password.message}
            </div>
          )}
        </div>

        <Button buttonType="submit" className={isSubmitting ? "disabled" : ""}>
          {isSubmitting ? "Submitting..." : "Sign up"}
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
