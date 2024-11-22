import { payloadEditPost } from "@/components/post/CreateEditDialog";
import { apiClient } from "../core/api-client";
import { baseUrl } from "@/constants/api-path";
import { Response } from "@/constants/response/response";

export const fetchEditPost = async (
  postId: number,
  payload: payloadEditPost
) => {
  try {
    const response = await apiClient.patch(
      `${baseUrl}/api/post/${postId}`,
      payload
    );
    const result = response.data;
    console.log(result);
    return result;
  } catch (error) {
    throw error;
  }
};
