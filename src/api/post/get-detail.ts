import { baseUrl } from "@/constants/api-path";
import { apiClient } from "../core/api-client";
import { Response } from "@/constants/response/response";
import { ResultDetailPost } from "@/constants/response/post/detail-post.response";

export const fetchDetailPost = async (
  id: number
): Promise<Response<ResultDetailPost>> => {
  try {
    const response = await apiClient.get(`${baseUrl}/api/post/${id}`, {
      headers: { Authorization: undefined },
    });
    const result: Response<ResultDetailPost> = response.data;
    return result;
  } catch (error) {
    throw error;
  }
};
