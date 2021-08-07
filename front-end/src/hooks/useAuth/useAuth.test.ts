import { renderHook, act } from "@testing-library/react-hooks/dom";
import { useAuthProvider } from "./useAuth";
import { SESSION_STORAGE_KEY } from "../../constants";

describe("useAuthProvider", () => {
  afterEach(() => {
    sessionStorage.clear();
  });

  test("login을 실행하면 isAuthenticated가 true가 되고 accessToken이 sessionStorage에 저장된다", async () => {
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

  test("logout을 실행하면 isAuthenticated가 false가 되고, accessToken이 sessionStorage에서 삭제된다", async () => {
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
});
