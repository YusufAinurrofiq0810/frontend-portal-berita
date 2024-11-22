import { Comment } from "@/constants/type/comment";
import { apiClient } from "../core/api-client";
import { baseUrl } from "@/constants/api-path";

export const fetchDeleteComment = async (comment: Comment) => {
  try {
    await apiClient.delete(`${baseUrl}/api/comment/${comment.id}`);
  } catch (error) {
    throw error;
  }
};
