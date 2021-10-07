/* eslint-disable class-methods-use-this */
import axios from "axios";
import { API_ENDPOINT, BASE_URL } from "../constants";
import type {
  MemberLoginResponse,
  MemberLoginRequest,
  MyInfoResponse,
  MemberSignupRequest,
} from "../types";

const httpClient = axios.create({ baseURL: BASE_URL });

class Client {
  async postLogin({ email, password }: MemberLoginRequest) {
    const {
      data: { accessToken },
    } = await httpClient.post<MemberLoginResponse>(API_ENDPOINT.MEMBER.LOGIN, {
      email,
      password,
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    httpClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    return accessToken;
  }

  async fetchMyInfo(accessToken?: string) {
    const { data: myInfo } = await httpClient.get<MyInfoResponse>(
      API_ENDPOINT.MEMBER.ME,
      accessToken
        ? {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        : undefined
    );

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
}

const client = new Client();

export default client;
