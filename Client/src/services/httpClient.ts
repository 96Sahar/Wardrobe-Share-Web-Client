import axios from "axios";
import Cookies from "js-cookie";

export class ApiError extends Error {
  response?: {
    data?: string;
  };
}

const URL = import.meta.env.VITE_URL as string;

const client = axios.create({
  baseURL: URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const getServerUrl = (): string => {
  return URL;
}

const formatPictureUrl = (picture: string) => {
  if (picture.startsWith("uploads")) {
    return `${getServerUrl()}${picture}`;
  }
  return picture;
};


const setAuthToken = (token: string): void => {
  if (token) {
    client.defaults.headers.common["Authorization"] = `JWT ${token}`;
  } else {
    delete client.defaults.headers.common["Authorization"];
  }
};

const refreshToken = async (refreshToken: string): Promise<string> => {
  const response = await client.post("/user/refresh", { refreshToken });
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

const checkToken = async (): Promise<string> => {
  let token = Cookies.get("authToken");
  const storedRefreshToken = Cookies.get("refreshToken");
  const expiration = Cookies.get("AuthExpiration");

  if (!token) {
    if (!storedRefreshToken) {
      throw new Error("User is not authenticated");
    }
    token = await refreshToken(storedRefreshToken);
  }

  if (expiration && new Date(expiration) < new Date()) {
    if (!storedRefreshToken) {
      throw new Error("No refresh token");
    }
    token = await refreshToken(storedRefreshToken);
  }

  return token;
};

export { client, setAuthToken, refreshToken, checkToken, getServerUrl , formatPictureUrl };
