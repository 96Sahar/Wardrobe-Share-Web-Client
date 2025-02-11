import Cookies from "js-cookie";
import { client, ApiError, setAuthToken, checkToken } from "./httpClient";
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
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data;
    }
    throw error;
  }
};

const logout = async () => {
  try {
    await checkToken();
    const refreshToken = Cookies.get("refreshToken");
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

const getUserByToken = async () => {
  try {
    const token = await checkToken();
    const response = await client.get(`/user/auth/settings`, {
      headers: { Authorization: `JWT ${token}` },
    });
    return response.data;
  } catch (error: unknown) {
    console.error("Error in getUserByToken:", error);
    if (error instanceof ApiError && error.response?.data) {
      throw error.response.data;
    }
    throw "An error occurred during the operation";
  }
};
const getUserById = async (userId: string) => {
  try {
    const response = await client.get(`/user/${userId}`);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof ApiError && error.response?.data) {
      throw error.response.data;
    }
    throw "An error when trying to get a user by id";
  }
};

const updateUserProfile = async (
  userData: Partial<UserData>
): Promise<AuthResponse> => {
  const token = Cookies.get("authToken");
  if (!token) {
    throw new Error("No authentication token found");
  }

  const formData = new FormData();
  if (userData.username) formData.append("username", userData.username);
  if (userData.f_name) formData.append("f_name", userData.f_name);
  if (userData.l_name) formData.append("l_name", userData.l_name);
  if (userData.picture) formData.append("picture", userData.picture);

  try {
    const response = await client.put<AuthResponse>("/user/update", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data;
    }

    throw error;
  }
};

const deleteUser = async () => {
  const token = checkToken();
  if (!token) {
    throw new Error("User is not authenticated!");
  }
  const refreshToken = Cookies.get("refreshToken");
  try {
    const response = await client.delete("/user/delete", {
      headers: { Authorization: `JWT ${refreshToken}` },
    });
    Cookies.remove("authToken");
    Cookies.remove("refreshToken");
    Cookies.remove("userInfo");
    Cookies.remove("AuthExpiration");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export {
  register,
  login,
  logout,
  getUserByToken,
  getUserById,
  updateUserProfile,
  deleteUser,
};
