export type MemberType = "MANAGER" | "USER";

export interface MemberSignupRequest {
  email: string;
  labId: number;
  memberType: MemberType;
  name: string;
  password: string;
}

export interface MemberLoginRequest {
  email: string;
  password: string;
}

export interface MemberLoginResponse {
  accessToken: string;
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
