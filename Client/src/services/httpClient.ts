import axios from "axios";

export class ApiError extends Error {
  response?: {
    data?: string;
  };
}

const API_URL = "http://localhost:3000";

export const client = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const setAuthToken = (token: string): void => {
  if (token) {
    client.defaults.headers.common["Authorization"] = `JWT ${token}`;
  } else {
    delete client.defaults.headers.common["Authorization"];
  }
};
