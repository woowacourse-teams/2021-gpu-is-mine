export type MemberType = "MANAGER" | "USER";

export interface MemberSignupRequest {
  email: string;
  labId: number;
  memberType: MemberType;
  name: string;
  password: string;
}

export type MemberLoginRequest = Pick<MemberSignupRequest, "email" | "password">;

export interface MemberLoginResponse {
  accessToken: string;
  expires: number;
}

export interface MyInfoResponse {
  id: number;
  email: string;
  name: string;
  labResponse: {
    id: number;
    name: string;
  };
  memberType: MemberType;
}
