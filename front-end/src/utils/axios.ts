import axios, { AxiosResponse } from "axios";

// const cache = new Map<string, { lastFetchedTime: number; data: unknown }>();

type RequestConfig<U> = {
  method: "get" | "post" | "head" | "delete" | "options" | "post" | "put" | "patch";
  body?: U;
};

// const REFRESH_PERIOD_IN_MS = 60_000;

const httpClient = axios.create();

httpClient.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("accessToken");

  if (token) {
    // eslint-disable-next-line
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// eslint-disable-next-line import/prefer-default-export
export const getData = async <T = void, U = never>(
  url: string,
  config?: RequestConfig<U>
): Promise<T> => {
  const { method = "get", body } = config ?? {};

  // const cached = cache.get(url);

  // if (method === "get" && cached && Date.now() - cached.lastFetchedTime <= REFRESH_PERIOD_IN_MS) {
  //   return cached.data as T;
  // }

  // const response = (await httpClient(url, { method, data: body })) as AxiosResponse<T>;

  // if (method === "get") {
  //   cache.set(url, { lastFetchedTime: Date.now(), data: response.data });
  // } else {
  //   cache.delete(url);
  // }

  const response = (await httpClient(url, { method, data: body })) as AxiosResponse<T>;

  return response.data;
};
