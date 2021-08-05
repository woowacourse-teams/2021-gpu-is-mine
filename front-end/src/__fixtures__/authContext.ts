export const membersMeResponse = {
  id: 3,
  email: "test@gg.com",
  name: "dd",
  memberType: "USER",
  labResponse: { id: 1, name: "GIM Lab - woowacourse" },
} as const;

export const authContextValue = {
  myInfo: membersMeResponse,
  isAuthenticated: false,
  isLoading: false,
  isFailed: false,
  isSucceed: true,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  signup: () => Promise.resolve(),
  done: () => {},
};
