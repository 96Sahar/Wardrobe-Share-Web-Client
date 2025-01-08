import axios, { AxiosInstance } from "axios";

class ApiError extends Error {
  response?: {
    data?: string;
  };
}

const API_URL = "http://localhost:3000"; // Replace with your backend URL

export const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const setAuthToken = (token: string): void => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `JWT ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

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
    const response = await api.post<AuthResponse>("/user/register", userData);
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
    const response = await api.post<AuthResponse>("/user/login", credentials);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof ApiError && error.response?.data) {
      throw error.response.data;
    }
    throw "An error occurred during the operation";
  }
};
