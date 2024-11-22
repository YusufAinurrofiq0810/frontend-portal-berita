import { baseUrl } from "@/constants/api-path";
import { apiClient } from "../core/api-client";
import { Response } from "@/constants/response/response";
import { AllComment } from "@/constants/response/comment/all-comment.response";

export const fetchCommentsByPost = async (postId: number) => {
  try {
    const response = await apiClient.get<Response<AllComment>>(
      `${baseUrl}/api/comment/${postId}`
    );
    const result: Response<AllComment> = response.data;
    return result;
  } catch (error) {
    throw error;
  }
};
