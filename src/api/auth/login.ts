import { baseUrl } from "@/constants/api-path";
import { apiClient } from "../core/api-client";
import { ResultLogin } from "@/constants/response/auth/login.response";
import { Response } from "@/constants/response/response";
import { AxiosError } from "axios";

export type LoginCred = {
  email: string;
  password: string;
};

export const fetchLogin = async (
  loginCred: LoginCred
): Promise<Response<ResultLogin>> => {
  try {
    await apiClient.get(`${baseUrl}/sanctum/csrf-cookie`);

    const resultResponse = await apiClient.post<Response<ResultLogin>>(
      `${baseUrl}/api/login`,
      {
        ...loginCred,
      },
      {
        headers: {
          Authorization: undefined,
        },
        xsrfCookieName: "XSRF-TOKEN",
        xsrfHeaderName: "X-XSRF-TOKEN",
      }
    );

    localStorage.setItem(
      "bearer-token",
      resultResponse?.data?.result?.token ?? ""
    );

    const result: Response<ResultLogin> = resultResponse.data;

    return result;
  } catch (error) {
    throw error;
  }
};
