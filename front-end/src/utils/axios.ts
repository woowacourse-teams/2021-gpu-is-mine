import axios from "axios";
import { BASE_URL, STORAGE_KEY } from "../constants";
import storage from "../services/Storage";
import type { RequestConfig } from "../types";

export const httpClient = axios.create({ baseURL: BASE_URL });

httpClient.interceptors.request.use((config) => {
  const expires = storage.get(STORAGE_KEY.EXPIRES, (_, value: string) => new Date(value));

  if (expires && expires.getTime() <= Date.now()) {
    storage.remove(STORAGE_KEY.ACCESS_TOKEN);
    storage.remove(STORAGE_KEY.EXPIRES);
  }

  return config;
});

// TODO 마이그레이션 완료시 getData 제거하기
export const getData = async <T = void, U = never>(url: string, config?: RequestConfig<U>) => {
  const { method = "get", body } = config ?? {};

  const response = await httpClient(url, { method, data: body });

  return response.data as T;
};
