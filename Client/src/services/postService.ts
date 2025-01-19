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

const likePost = async (postId: string) => {
  // Ensure the token is retrieved properly
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

const getFeedPosts = async () => {
  try {
    const response = await client.get(`/post/feed`);
    return response.data;
  } catch (error) {
    if (error instanceof ApiError && error.response?.data) {
      throw error.response.data;
    }
    throw "An error occurred during the operation";
  }
};

const getAllPost = async (
  user: string = "",
  category: string = "",
  region: string = "",
  page: number = 1,
  limit: number = 20
) => {
  let endpoint = `/post?page=${page}&limit=${limit}`;

  try {
    if (category) {
      endpoint += `&category=${category}`;
    }
    if (region) {
      endpoint += `&region=${region}`;
    }
    if (user) {
      endpoint += `&user=${user}`;
    }

    const response = await client.get(endpoint);
    return response.data; // Adjust to match new response format
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

const updatePost = async (postId: string, postData: FormData) => {
  const token = await checkToken();

  try {
    const response = await client.put(`/post/${postId}`, postData, {
      headers: {
        Authorization: `JWT ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.log("Failed to update post with the error of: ", error);
    throw error; // Re-throw the error so it can be handled by the caller
  }
};
const deletePost = async (postId: string) => {
  const token = await checkToken();
  try {
    const response = await client.delete(`/post/${postId}`, {
      headers: {
        Authorization: `JWT ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.log("Failed to delete post with the error of: ", error);
  }
};
export {
  createPost,
  getAllPost,
  likePost,
  getPostById,
  updatePost,
  deletePost,
  getFeedPosts,
};
