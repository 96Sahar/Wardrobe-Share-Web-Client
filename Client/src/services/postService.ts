import Cookies from "js-cookie";
import { ApiError, client } from "./httpClient";
import { AuthResponse, postData } from "./interfaceService";

const createPost = async (postData: postData) => {
  const token = Cookies.get("authToken"); // Ensure you are storing the token securely
  if (!token) {
    throw new Error("User is not authenticated");
  }

  try {
    const response = await client.post<AuthResponse>("/post", postData, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
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
