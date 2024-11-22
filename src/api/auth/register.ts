import { baseUrl } from "@/constants/api-path";
import { apiClient } from "../core/api-client";
import { Response } from "@/constants/response/response";
import { ResultRegister } from "@/constants/response/auth/register.response";

export type RegisterCred = {
  email: string;
  name: string;
  password: string;
  confirm_password: string;
};

export const fetchRegister = async (
  registerCred: RegisterCred
): Promise<Response<ResultRegister>> => {
  try {
    const response = await apiClient.post(
      `${baseUrl}/api/register`,
      { ...registerCred },
      { headers: { Authorization: undefined } }
    );
    const result: Response<ResultRegister> = response.data;
    return result;
  } catch (error) {
    throw error;
  }
};
