import { baseUrl } from "@/constants/api-path";
import { apiClient } from "../core/api-client";

export const fetchDeletePost = async (postId: string) => {
  try {
    await apiClient.delete(`${baseUrl}/api/post/${postId}`);
  } catch (error) {
    throw error;
  }
};
