import axios from "axios";
import { BASE_URL, SESSION_STORAGE_KEY } from "../constants";
import storage from "../services/Storage";
import type { RequestConfig } from "../types";

const httpClient = axios.create({ baseURL: BASE_URL });

httpClient.interceptors.request.use((config) => {
  const token = storage.get(SESSION_STORAGE_KEY.ACCESS_TOKEN);

  if (token) {
    // eslint-disable-next-line
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// eslint-disable-next-line import/prefer-default-export
export const getData = async <T = void, U = never>(url: string, config?: RequestConfig<U>) => {
  const { method = "get", body } = config ?? {};

  const response = await httpClient(url, { method, data: body });

  return response.data as T;
};
