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
    const userInfo = getUserById(response.data._id);

    Cookies.set("userInfo", JSON.stringify(userInfo));
    // 50 minutes
    const expiresIn = 50 * 60 * 1000;
    const expiration = new Date(Date.now() + expiresIn).toISOString();
    Cookies.set("AuthExpiration", expiration);
    Cookies.set("authToken", response.data.accessToken, {
      sameSite: "strict",
    });
    Cookies.set("refreshToken", response.data.refreshToken, {
      sameSite: "strict",
    });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof ApiError && error.response?.data) {
      throw error.response.data;
    }
    throw "An error occurred during the operation";
  }
};

const logout = async (refreshToken: string) => {
  try {
    console.log("Sending refresh token to backend:", refreshToken); 
    await client.post("/user/logout", { refreshToken }); 
    Cookies.remove("authToken");
    Cookies.remove("refreshToken");
    Cookies.remove("userInfo");
    Cookies.remove("AuthExpiration");
    return "Logged out successfully";
  } catch (error: unknown) {
    console.error("Logout error:", error);
    if (error instanceof ApiError && error.response?.data) {
      throw error.response.data;
    }
    throw new Error("An error occurred during the operation");
  }
};


const getUserByToken = async (): Promise<AuthResponse> => {
  try {
    const response = await client.get<AuthResponse>("/user/auth/settings");
    return response.data;
  } catch (error: unknown) {
    if (error instanceof ApiError && error.response?.data) {
      throw error.response.data;
    }
  }
  throw "An error when trying to get user by token";
};

const getUserById = async (userId: string) => {
  try {
    const response = await client.get(`/user/${userId}`);
    console.log(response.data);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof ApiError && error.response?.data) {
      throw error.response.data;
    }
    throw "An error when trying to get a user by id";
  }
};

export { register, login, getUserById, getUserByToken, logout };
