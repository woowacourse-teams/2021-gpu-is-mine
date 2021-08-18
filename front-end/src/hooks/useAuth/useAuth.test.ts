/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { renderHook, act } from "@testing-library/react-hooks/dom";
import { useAuthProvider } from "./useAuth";
import { SESSION_STORAGE_KEY } from "../../constants";

const mockRequestSignup = jest.fn();

const mockFetchMyInfo = jest.fn();

jest.mock("../useApi/useApi", () => {
  const originalUseApi = jest.requireActual("../useApi/useApi");

  return {
    ...originalUseApi,
    usePostSignup: () => ({
      ...originalUseApi.usePostSignup,
      makeRequest: mockRequestSignup,
    }),
    useGetMyInfo: () => ({
      ...originalUseApi.useGetInfo,
      makeRequest: mockFetchMyInfo,
    }),
  };
});

describe("useAuthProvider", () => {
  afterEach(() => {
    sessionStorage.clear();
    jest.resetModules();
  });

  test(`login을 호출하면 login API를 호출한다.
        myInfo API를 호출한다.
        accessToken을 sessionStorage에 저장한다.
        isAuthenticated에 true를 할당한다 `, async () => {
    const { result, waitFor } = renderHook(() => useAuthProvider());

    const validEmail = "test@gg.com";
    const validPassword = "abcd123!@#";

    act(() => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      result.current.login({ email: validEmail, password: validPassword });
    });

    await waitFor(() => !result.current.isLoading);

    expect(sessionStorage.getItem(SESSION_STORAGE_KEY.ACCESS_TOKEN)).not.toBeNull();
    expect(result.current.isAuthenticated).toBe(true);
  });

  test("logout을 실행하면 isAuthenticated가 false가 되고, accessToken이 sessionStorage에서 삭제된다", () => {
    const { result } = renderHook(() => useAuthProvider());

    sessionStorage.setItem(SESSION_STORAGE_KEY.ACCESS_TOKEN, "mock-access-token");

    expect(sessionStorage.getItem(SESSION_STORAGE_KEY.ACCESS_TOKEN)).not.toBeNull();

    act(() => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      result.current.logout();
    });

    expect(result.current.isAuthenticated).toBe(false);

    expect(sessionStorage.getItem(SESSION_STORAGE_KEY.ACCESS_TOKEN)).toBeNull();
  });

  test("signup을 호출하면 signup API를 호출한다", async () => {
    const { result } = renderHook(() => useAuthProvider());

    act(() => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      result.current.signup({
        email: "abcd@abcd.com",
        labId: 1,
        memberType: "USER",
        name: "dd",
        password: "abcd123!@#",
      });
    });

    expect(mockRequestSignup).toHaveBeenCalled();
  });

  describe("sessionStorage에 token이 존재하는 경우", () => {
    test("올바른 토큰인 경우 isAuthenticated가 true이다", async () => {
      sessionStorage.setItem(SESSION_STORAGE_KEY.ACCESS_TOKEN, "access-token");

      const data = {};
      const error = null;
      mockFetchMyInfo.mockResolvedValue({ data, error });

      const { result, waitForValueToChange } = renderHook(() => useAuthProvider());

      await waitForValueToChange(() => result.current.isAuthenticated);

      expect(mockFetchMyInfo).toHaveBeenCalled();

      expect(result.current.isAuthenticated).toBe(true);
    });

    test("잘못된 토큰인 경우 isAuthenticated가 false이다", async () => {
      sessionStorage.setItem(SESSION_STORAGE_KEY.ACCESS_TOKEN, "wrong-access-token");

      const data = null;
      const error = {};
      mockFetchMyInfo.mockResolvedValue({ data, error });

      const { result, waitFor } = renderHook(() => useAuthProvider());
      expect(mockFetchMyInfo).toHaveBeenCalled();

      await waitFor(() => sessionStorage.getItem(SESSION_STORAGE_KEY.ACCESS_TOKEN) === null);

      expect(result.current.isAuthenticated).toBe(false);
    });
  });
});
