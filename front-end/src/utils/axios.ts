import axios from "axios";
import { BASE_URL, STORAGE_KEY } from "../constants";
import { throwError } from "./error";
import storage from "../services/Storage";
import type { RequestConfig } from "../types";

export const httpClient = axios.create({ baseURL: BASE_URL });

export const validateExpires = (expires: Date) => {
  if (expires.getTime() <= Date.now()) {
    throwError("AuthorizationError", "유효하지 않은 Token입니다");
  }
};

httpClient.interceptors.request.use((config) => {
  const expires = storage.get(STORAGE_KEY.EXPIRES, (_, value: string) => new Date(value));

  if (expires) {
    validateExpires(expires);
  }

  return config;
});

// TODO 마이그레이션 완료시 getData 제거하기
export const getData = async <T = void, U = never>(url: string, config?: RequestConfig<U>) => {
  const { method = "get", body } = config ?? {};

  const response = await httpClient(url, { method, data: body });

  return response.data as T;
};
