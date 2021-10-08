import { API_ENDPOINT, STORAGE_KEY } from "../constants";
import { httpClient, throwError } from "../utils";
import storage from "./Storage";
import type {
  MemberLoginResponse,
  MemberLoginRequest,
  MyInfoResponse,
  MemberSignupRequest,
} from "../types";

class Client {
  private accessToken: string | null | undefined;

  private expires: Date | null | undefined;

  async postLogin({ email, password }: MemberLoginRequest) {
    const {
      data: { accessToken, expires: maxAge },
    } = await httpClient.post<MemberLoginResponse>(API_ENDPOINT.MEMBER.LOGIN, {
      email,
      password,
    });

    this.accessToken = accessToken;
    this.expires = new Date(Date.now() + maxAge);
  }

  async fetchMyInfo() {
    this.accessToken ??= storage.get(STORAGE_KEY.ACCESS_TOKEN);

    // 비정상적인 호출에 대한 방어 코드
    if (this.accessToken == null) {
      return throwError("AuthorizationError", "토큰이 존재하지 않습니다");
    }

    const { data: myInfo } = await httpClient.get<MyInfoResponse>(API_ENDPOINT.MEMBER.ME, {
      headers: { Authorization: `Bearer ${this.accessToken}` },
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    httpClient.defaults.headers.common.Authorization = `Bearer ${this.accessToken}`;

    storage.set(STORAGE_KEY.ACCESS_TOKEN, this.accessToken);
    storage.set(STORAGE_KEY.EXPIRES, this.expires);

    return myInfo;
  }

  // eslint-disable-next-line class-methods-use-this
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
    this.accessToken = null;
    this.expires = null;

    storage.remove(STORAGE_KEY.ACCESS_TOKEN);
    storage.remove(STORAGE_KEY.EXPIRES);
  }
}

const client = new Client();

export default client;
