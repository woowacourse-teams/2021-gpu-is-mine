import axios from "axios";
import { BASE_URL, STORAGE_KEY } from "../constants";
import { isAxiosError, throwError } from "./error";
import storage from "../services/Storage";
import type { RequestConfig } from "../types";

export const httpClient = axios.create({ baseURL: BASE_URL });

httpClient.interceptors.request.use((config) => {
  const expires = storage.get(STORAGE_KEY.EXPIRES, (_, value: string) => new Date(value));

  if (expires && expires.getTime() <= Date.now()) {
    storage.remove(STORAGE_KEY.ACCESS_TOKEN);
    storage.remove(STORAGE_KEY.EXPIRES);
    throwError("AuthorizationError", "토큰의 유효시간이 경과되었습니다");
  }

  return config;
});

httpClient.interceptors.response.use(
  (response) => response,
  // eslint-disable-next-line consistent-return
  (error) => {
    if (!isAxiosError<{ message: string }>(error)) {
      return throwError("UnknownError", "관리자에게 문의해주세요");
    }

    // Network Error
    if (error.message === "Network Error") {
      return throwError("NetworkError", "잠시 후 다시 시도해주세요");
    }

    if (error.response?.status === 401) {
      return throwError("AuthorizationError", error.response.data.message);
    }

    if (/^4/.test(error.response?.status.toString() ?? "")) {
      return throwError("BadRequestError", error.response!.data.message);
    }

    if (/^5/.test(error.response?.status.toString() ?? "")) {
      return throwError("InternalError", "관리자에게 문의해주세요");
    }
  }
);

// TODO 마이그레이션 완료시 getData 제거하기
export const getData = async <T = void, U = never>(url: string, config?: RequestConfig<U>) => {
  const { method = "get", body } = config ?? {};

  const response = await httpClient(url, { method, data: body });

  return response.data as T;
};
