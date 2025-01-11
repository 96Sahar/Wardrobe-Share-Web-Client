import Cookies from "js-cookie";
import { client, ApiError, setAuthToken } from "./httpClient";
import { UserData, AuthResponse, LoginCredentials } from "./interfaceService";
import axios from "axios";

const register = async (userData: UserData) => {
  try {
    const response = await client.post<AuthResponse>(
      "/user/register",
      userData
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Server Error:", error.response.data);
      throw new Error(error.response.data as string);
    }
    console.error("Unknown Error:", error);
    throw new Error("An error occurred during the operation");
  }
};
const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  try {
    const response = await client.post<AuthResponse>(
      "/user/login",
      credentials
    );

    setAuthToken(response.data.accessToken);

    Cookies.set("authToken", response.data.accessToken, {
      sameSite: "strict",
    });
    console.log(response.data);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof ApiError && error.response?.data) {
      throw error.response.data;
    }
    throw "An error occurred during the operation";
  }
};

export { register, login };
