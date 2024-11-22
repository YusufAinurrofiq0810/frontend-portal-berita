import { baseUrl } from "@/constants/api-path";
import { getUserToken } from "@/utils/helpers";
import axios from "axios";

const token = getUserToken();

export const apiClient = axios.create({
  baseURL: `${baseUrl}`,
  headers: {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
  },
  withXSRFToken: true,
  withCredentials: true,
});

// apiClient.interceptors.request.use((e) => {})
