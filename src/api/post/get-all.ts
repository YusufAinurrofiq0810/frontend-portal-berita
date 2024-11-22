import { baseUrl } from "@/constants/api-path";
import { apiClient } from "../core/api-client";
import { Response } from "@/constants/response/response";
import { PaginateAllPost } from "@/constants/response/post/paginate-all-post.response";

export const fetchGetAllPost = async ({ page }: { page?: number }) => {
  try {
    const response = await apiClient.get(`${baseUrl}/api/post/get-all`, {
      headers: { Authorization: undefined },
      params: { page: page ?? undefined },
    });

    const result: Response<PaginateAllPost> = response.data;
    return result;
  } catch (error) {
    throw error;
  }
};
