import axios from "axios";
import Cookies from "js-cookie";

export class ApiError extends Error {
  response?: {
    data?: string;
  };
}

const API_URL = "http://localhost:3000";

const client = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const setAuthToken = (token: string): void => {
  if (token) {
    client.defaults.headers.common["Authorization"] = `JWT ${token}`;
  } else {
    delete client.defaults.headers.common["Authorization"];
  }
};

const refreshToken = async (refresh: string): Promise<string> => {
  const response = await client.post("/user/refresh", { refresh });
  const expiresIn = 50 * 60 * 1000;
  const expiration = new Date(Date.now() + expiresIn).toISOString();
  Cookies.set("AuthExpiration", expiration);
  Cookies.set("authToken", response.data.accessToken, {
    sameSite: "strict",
  });
  Cookies.set("refreshToken", response.data.refreshToken, {
    sameSite: "strict",
  });

  return response.data.accessToken;
};

const checkToken = async () => {
  let token = Cookies.get("authToken");
  const storedRefreshToken = Cookies.get("refreshToken"); // Renamed to avoid shadowing
  const expiration = Cookies.get("AuthExpiration");

  if (!token) {
    if (!storedRefreshToken) {
      throw new Error("User is not authenticated");
    }
    token = await refreshToken(storedRefreshToken); // Use the refreshToken function here
  }

  if (expiration && new Date(expiration) < new Date()) {
    if (!storedRefreshToken) {
      throw new Error("No refresh token");
    }
    token = await refreshToken(storedRefreshToken); // Use the refreshToken function here
  }
};

export { client, setAuthToken, refreshToken, checkToken };
