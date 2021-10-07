import type { AuthState } from "../features/member/authSlice";

export const membersMeResponse = {
  id: 3,
  email: "test@gg.com",
  name: "dd",
  memberType: "USER",
  labResponse: { id: 1, name: "GIM Lab - woowacourse" },
} as const;

export const succeedAuthState: AuthState = {
  status: "succeed",
  error: null,
  myInfo: {
    memberId: 2,
    email: "test@test.com",
    name: "name",
    labId: 1,
    labName: "GIM Lab - woowacourse",
    memberType: "MANAGER",
  },
};
