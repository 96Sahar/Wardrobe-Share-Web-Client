import { ApiError, checkToken, client } from "./httpClient";
import { AuthResponse } from "./interfaceService";
import axios from "axios";

const createPost = async (postData: FormData) => {
  try {
    const token = await checkToken();
    const response = await client.post<AuthResponse>("/post", postData, {
      headers: {
        Authorization: `JWT ${token}`,
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

const likePost = async (postId: string) => { // Ensure the token is retrieved properly
  try {
    const token = await checkToken();
    const response = await client.post(
      `/post/${postId}/like`, 
      {}, // No body needed for this request
      {
        headers: { Authorization: `JWT ${token}` }, // Correctly set headers here
      }
    );
    console.log("Like response:", response.data);
    return response.data;
  } catch (error) {
    if (error instanceof ApiError && error.response?.data) {
      throw error.response.data;
    }
    throw "An error occurred during the operation";
  }
};

const getAllPost = async (category: string, region: string, user: string) => {
  let endpoint = "/post";
  try {
    if (category && !region) {
      endpoint = `/post?category=${category}`;
    }
    if (category && region) {
      endpoint = `/post?category=${category}&region=${region}`;
    }
    if (!category && region) {
      endpoint = `/post?region=${region}`;
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

const getPostById = async (postId: string) => {
  try {
    const response = await client.get(`/post/${postId}`);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data as string);
    }
    throw new Error("Unknown error when trying to get a post by id");
  }
};

export { createPost, getAllPost, likePost, getPostById };
