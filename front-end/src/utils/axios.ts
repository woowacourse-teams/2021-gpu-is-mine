import axios, { AxiosRequestConfig } from "axios";
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

const fetch = <T>(url: string, { method, data }: AxiosRequestConfig) =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  axios(url, { method, data }).then((response) => response.data as T);

// eslint-disable-next-line import/prefer-default-export
export const getData = <T = void, U = never>(url: string, config?: RequestConfig<U>) => {
  const { method = "get", body } = config ?? {};

  return fetch<T>(url, { method, data: body });
};
