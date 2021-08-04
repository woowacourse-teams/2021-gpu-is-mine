import axios, { AxiosRequestConfig } from "axios";
import { SESSION_STORAGE_KEY } from "../constants";
import { RequestConfig } from "../types";

const httpClient = axios.create();

httpClient.interceptors.request.use((config) => {
  const token = sessionStorage.getItem(SESSION_STORAGE_KEY.ACCESS_TOKEN);

  if (token) {
    // eslint-disable-next-line
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

const REFRESH_PERIOD_IN_MS = 60_000;

const cache = new Map<string | symbol, { lastFetchedTime: number; data: unknown }>();

const fetch = async <T>(url: string, { method, data }: AxiosRequestConfig) =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  (await httpClient(url, { method, data })).data as T;

// eslint-disable-next-line import/prefer-default-export
export const getData = async <T = void, U = never>(
  url: string,
  config?: RequestConfig<U>
): Promise<T> => {
  const { method = "get", body, relatedKey } = config ?? {};

  if (method === "get") {
    const cached = cache.get(url);

    if (cached && Date.now() - cached.lastFetchedTime <= REFRESH_PERIOD_IN_MS) {
      return cached.data as T;
    }

    const data = await fetch<T>(url, { method, data: body });

    cache.set(url, { lastFetchedTime: Date.now(), data });

    return data;
  }

  const data = await fetch<T>(url, { method, data: body });

  if (relatedKey) {
    relatedKey.forEach((rKey) => cache.delete(rKey));
  }

  return data;
};
