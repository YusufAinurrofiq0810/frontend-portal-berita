import { baseUrl } from "@/constants/api-path";
import { apiClient } from "../core/api-client";

export type payloadCreatePost = {
  title: string;
  body: string;
};

export const fetchCreatePost = async (payload: payloadCreatePost) => {
  try {
    await apiClient.post(`${baseUrl}/api/post`, payload);
  } catch (error) {
    throw error;
  }
};
