import { baseUrl } from "@/constants/api-path";
import { apiClient } from "../core/api-client";
import { Response } from "@/constants/response/response";
import { CreateComment } from "@/constants/response/comment/new-comment.response";

export type payloadCreateComment = {
  body: string;
};

export const fetchCreateComment = async (
  postId: number,
  payload: payloadCreateComment
) => {
  try {
    const response = await apiClient.post<Response<CreateComment>>(
      `${baseUrl}/api/comment/${postId}`,
      {
        ...payload,
      }
    );

    const result: Response<CreateComment> = response.data;
    return result;
  } catch (error) {
    throw error;
  }
};
