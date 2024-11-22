import { baseUrl } from "@/constants/api-path";
import { apiClient } from "../core/api-client";
import { Response } from "@/constants/response/response";

export const fetchLogout = async () => {
  try {
    await apiClient.post<Response<{}>>(`${baseUrl}/api/logout`);
  } catch (error) {
    throw error;
  }
};
