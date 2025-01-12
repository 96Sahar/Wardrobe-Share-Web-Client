import Cookies from "js-cookie";
import { ApiError, client } from "./httpClient";
import { AuthResponse } from "./interfaceService";

const createPost = async (postData: FormData) => {
  const token = Cookies.get("authToken");
  if (!token) {
    throw new Error("User is not authenticated");
  }

  try {
    const response = await client.post<AuthResponse>("/post", postData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    if (error instanceof ApiError && error.response?.data) {
      throw error.response.data;
    }
    throw "An error occurred during the operation";
  }
};

export { createPost };
