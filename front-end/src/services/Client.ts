import type { AxiosInstance } from "axios";
import { API_ENDPOINT } from "../constants";
import { httpClient } from "../utils";
import type {
  MemberLoginResponse,
  MemberLoginRequest,
  MyInfoResponse,
  MemberSignupRequest,
} from "../types";

class Client {
  constructor(private http: AxiosInstance) {}

  async postLogin({ email, password }: MemberLoginRequest) {
    const {
      data: { accessToken, expires: maxAge },
    } = await this.http.post<MemberLoginResponse>(API_ENDPOINT.MEMBER.LOGIN, {
      email,
      password,
    });

    const expires = new Date(Date.now() + maxAge);

    this.setAuthorizationHeader(accessToken);

    return { accessToken, expires };
  }

  setAuthorizationHeader(accessToken: string) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    this.http.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  }

  async fetchMyInfo() {
    const { data: myInfo } = await this.http.get<MyInfoResponse>(API_ENDPOINT.MEMBER.ME);

    return myInfo;
  }

  async postSignup({ email, password, name, labId, memberType }: MemberSignupRequest) {
    await this.http.post<never>(API_ENDPOINT.MEMBER.SIGNUP, {
      email,
      password,
      name,
      labId,
      memberType,
    });
  }
}

const client = new Client(httpClient);

export default client;
