import { client, ApiError, setAuthToken } from "./httpClient";

export interface UserData {
  username: string;
  password: string;
  email: string;
  f_name: string;
  l_name: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  username: string;
  _id: string;
  accessToken: string;
  refreshToken: string;
}

export const register = async (userData: UserData): Promise<AuthResponse> => {
  try {
    const response = await client.post<AuthResponse>(
      "/user/register",
      userData
    );
    return response.data;
  } catch (error: unknown) {
    if (error instanceof ApiError && error.response?.data) {
      throw error.response.data;
    }
    throw "An error occurred during the operation";
  }
};

export const login = async (
  credentials: LoginCredentials
): Promise<AuthResponse> => {
  try {
    const response = await client.post<AuthResponse>(
      "/user/login",
      credentials
    );
    setAuthToken(response.data.accessToken);

    //Add SetCookie

    return response.data;
  } catch (error: unknown) {
    if (error instanceof ApiError && error.response?.data) {
      throw error.response.data;
    }
    throw "An error occurred during the operation";
  }
};
