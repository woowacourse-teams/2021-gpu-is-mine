/* eslint-disable class-methods-use-this */
import { AxiosError } from "axios";
import { API_ENDPOINT, STORAGE_KEY } from "../constants";
import { httpClient, throwError, validateExpires } from "../utils";
import storage from "./Storage";
import type {
  MemberLoginResponse,
  MemberLoginRequest,
  MyInfoResponse,
  MemberSignupRequest,
  GpuServerViewResponses,
  GpuServerRegisterRequest,
} from "../types";

const Client = class {
  async postLogin({ email, password }: MemberLoginRequest) {
    const {
      data: { accessToken, expires: maxAge },
    } = await httpClient.post<MemberLoginResponse>(API_ENDPOINT.MEMBER.LOGIN, {
      email,
      password,
    });

    const expires = new Date(Date.now() + maxAge);

    return { accessToken, expires };
  }

  async fetchMyInfo({ accessToken, expires }: { accessToken: string; expires: Date }) {
    validateExpires(expires);

    const { data: myInfo } = await httpClient.get<MyInfoResponse>(API_ENDPOINT.MEMBER.ME, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    httpClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    storage.set(STORAGE_KEY.ACCESS_TOKEN, accessToken);
    storage.set(STORAGE_KEY.EXPIRES, expires);

    return myInfo;
  }

  async postSignup({ email, password, name, labId, memberType }: MemberSignupRequest) {
    await httpClient.post<never>(API_ENDPOINT.MEMBER.SIGNUP, {
      email,
      password,
      name,
      labId,
      memberType,
    });
  }

  // TODO: logout API 요청하기
  async logout() {
    storage.remove(STORAGE_KEY.ACCESS_TOKEN);
    storage.remove(STORAGE_KEY.EXPIRES);
  }

  async fetchGpuServerAll(labId: number) {
    return httpClient.get<GpuServerViewResponses>(API_ENDPOINT.LABS(labId).GPUS);
  }

  async postGpuServer(labId: number, body: GpuServerRegisterRequest) {
    try {
      await httpClient.post<{ message?: string }>(API_ENDPOINT.LABS(labId).GPUS, body);
    } catch (e) {
      const error = e as AxiosError<{ message: string }>;

      if (error?.response?.status === 400) {
        throwError("BadRequestError", error?.response?.data.message);
      }

      throw error;
    }
  }

  async deleteGpuServerById({ labId, serverId }: { labId: number; serverId: number }) {
    await httpClient.delete<never>(`${API_ENDPOINT.LABS(labId).GPUS}/${serverId}`);
  }
};

const client = new Client();

export default client;
