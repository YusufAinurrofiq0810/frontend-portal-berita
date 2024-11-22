import { baseUrl } from "@/constants/api-path";
import { apiClient } from "../core/api-client";
import { Response } from "@/constants/response/response";
import { CreateComment } from "@/constants/response/comment/new-comment.response";
import { EditComment } from "@/constants/response/comment/edit-comment.rseponse";

export type payloadEditComment = {
  body?: string;
};

export const fetchEditComment = async (
  commentId: number,
  payload: payloadEditComment
) => {
  try {
    const response = await apiClient.patch<Response<EditComment>>(
      `${baseUrl}/api/comment/${commentId}`,
      {
        ...payload,
      }
    );

    const result: Response<EditComment> = response.data;
    return result;
  } catch (error) {
    throw error;
  }
};
