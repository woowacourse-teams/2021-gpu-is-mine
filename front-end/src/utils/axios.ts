import axios from "axios";
import { SESSION_STORAGE_KEY } from "../constants";
import { RequestConfig } from "../types";

axios.interceptors.request.use((config) => {
  const token = sessionStorage.getItem(SESSION_STORAGE_KEY.ACCESS_TOKEN);

  if (token) {
    // eslint-disable-next-line
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// eslint-disable-next-line import/prefer-default-export
export const getData = async <T = void, U = never>(url: string, config?: RequestConfig<U>) => {
  const { method = "get", body } = config ?? {};

  const response = await axios(url, { method, data: body });

  return response.data as T;
};
