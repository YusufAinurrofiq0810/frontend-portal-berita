import { apiClient } from "../core/api-client";
import { baseUrl } from "@/constants/api-path";
import { Response } from "@/constants/response/response";
import { AxiosError } from "axios";
import { Profile } from "@/constants/response/auth/profile.response";

export const fetchProfile = async (): Promise<Response<Profile>> => {
  try {
    const response = await apiClient.get(`${baseUrl}/api/profile`);

    const result: Response<Profile> = response.data;
    return result;
  } catch (error) {
    throw error;
  }
};
