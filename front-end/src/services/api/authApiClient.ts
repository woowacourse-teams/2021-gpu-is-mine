/* eslint-disable class-methods-use-this */
import { API_ENDPOINT, STORAGE_KEY } from "../../constants";
import { httpClient } from "../../utils";
import storage from "../Storage";
import type {
  MemberLoginResponse,
  MemberLoginRequest,
  MyInfoResponse,
  MemberSignupRequest,
} from "../../types";

const postLogin = async ({ email, password }: MemberLoginRequest) => {
  const {
    data: { accessToken, expires: maxAge },
  } = await httpClient.post<MemberLoginResponse>(API_ENDPOINT.MEMBER.LOGIN, {
    email,
    password,
  });

  const expires = new Date(Date.now() + maxAge);

  return { accessToken, expires };
};

const fetchMyInfo = async ({ accessToken, expires }: { accessToken: string; expires: Date }) => {
  const { data: myInfo } = await httpClient.get<MyInfoResponse>(API_ENDPOINT.MEMBER.ME, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  httpClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

  storage.set(STORAGE_KEY.ACCESS_TOKEN, accessToken);
  storage.set(STORAGE_KEY.EXPIRES, expires);

  return myInfo;
};

const postSignup = async ({ email, password, name, labId, memberType }: MemberSignupRequest) => {
  await httpClient.post<never>(API_ENDPOINT.MEMBER.SIGNUP, {
    email,
    password,
    name,
    labId,
    memberType,
  });
};

// TODO: logout API 요청하기
const logout = async () => {
  storage.remove(STORAGE_KEY.ACCESS_TOKEN);
  storage.remove(STORAGE_KEY.EXPIRES);
};

const client = { postLogin, fetchMyInfo, postSignup, logout };

export default client;
