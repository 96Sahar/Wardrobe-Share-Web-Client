import Cookies from "js-cookie";
import { ApiError, client } from "./httpClient";
import { AuthResponse } from "./interfaceService";
import axios from "axios";

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

const getAllPost = async (category?: string, user?: string) => {
  let endpoint = "/post";
  try {
    if (category) {
      endpoint = `/post?catagory=${category}`;
    }
    if (user) {
      endpoint = `/post?user=${user}`;
    }
    const response = await client.get(endpoint);
    return response;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data as string);
    }
    throw new Error("Unknown error when trying to get a post");
  }
};

export { createPost, getAllPost };
