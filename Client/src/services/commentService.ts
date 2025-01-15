import { ApiError, checkToken, client } from "./httpClient";
import { AuthResponse } from "./interfaceService";

const createComment = async (postId: string, content: string) => {
  try {
    const token = await checkToken();
    const response = await client.post<AuthResponse>("/comment", content, {
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

const updateComment = async (commentData: string, commentId: string) => {
    try {
        const token = await checkToken();
        const response = await client.put<AuthResponse>(
        `/comment/${commentId}`,
        commentData,
        {
            headers: { Authorization: `JWT ${token}` },
        }
        );
        return response.data;
    } catch (error) {
        if (error instanceof ApiError && error.response?.data) {
        throw error.response.data;
        }
        throw "An error occurred during the operation";
    }
};

const deleteComment = async (commentId: string) => {
    try {
        const token = await checkToken();
        const response = await client.delete(`/comment/${commentId}`, {
        headers: { Authorization: `JWT ${token}` },
        });
        return response.data;
    } catch (error) {
        if (error instanceof ApiError && error.response?.data) {
        throw error.response.data;
        }
        throw "An error occurred during the operation";
    }
};

const getCommentById = async (commentId: string) => {
    try {
        const response = await client.get(`/comment/${commentId}`);
        return response.data;
    } catch (error) {
        if (error instanceof ApiError && error.response?.data) {
        throw error.response.data;
        }
        throw "An error occurred during the operation";
    }
};

const getCommentsByPostId = async (postId: string) => {
    try {
        const response = await client.get(`/comment/post/${postId}`);
        return response.data;
    } catch (error) {
        if (error instanceof ApiError && error.response?.data) {
        throw error.response.data;
        }
        throw "An error occurred during the operation";
    }
};

export { createComment, updateComment, deleteComment, getCommentById, getCommentsByPostId };
