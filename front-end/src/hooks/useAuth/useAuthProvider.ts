import { useCallback, useEffect } from "react";
import useBoolean from "../useBoolean/useBoolean";
import { usePostLogin, useGetMyInfo, usePostSignup } from "../useApi/useApi";
import { MemberLoginRequest, MemberSignupRequest } from "../../types";
import { unwrapResult } from "../useFetch/useFetch";
import { SESSION_STORAGE_KEY } from "../../constants";

// eslint-disable-next-line prefer-const
let logoutTimer: null | NodeJS.Timeout = null;

const useRequest = () => {
  const { makeRequest: requestLogin, status: loginStatus, done: loginDone } = usePostLogin();

  const {
    makeRequest: fetchMyInfo,
    status: myInfoStatus,
    data: myInfo,
    done: myInfoDone,
  } = useGetMyInfo();

  const { makeRequest: requestSignup, status: signupStatus, done: signupDone } = usePostSignup();

  const isLoading = [loginStatus, myInfoStatus, signupStatus].some(
    (status) => status === "loading"
  );

  const isFailed = [loginStatus, myInfoStatus, signupStatus].some((status) => status === "failed");

  const isSucceed =
    [loginStatus, myInfoStatus, signupStatus].every(
      (status) => status === "succeed" || status === "idle"
    ) &&
    [loginStatus, myInfoStatus, signupStatus].find((status) => status === "succeed") !== undefined;

  const done = useCallback(() => {
    loginDone();
    myInfoDone();
    signupDone();
  }, [loginDone, myInfoDone, signupDone]);

  return { requestLogin, requestSignup, fetchMyInfo, myInfo, isLoading, isFailed, done, isSucceed };
};

const useAuthProvider = () => {
  const [isAuthenticated, authenticate, unauthenticate] = useBoolean(false);

  const {
    isLoading,
    isFailed,
    requestLogin,
    requestSignup,
    fetchMyInfo,
    myInfo,
    done,
    isSucceed,
  }: ReturnType<typeof useRequest> = useRequest();

  const signup = useCallback(
    async ({ email, labId, password, name, memberType }: MemberSignupRequest) => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      requestSignup({ email, labId, password, name, memberType });
    },
    [requestSignup]
  );

  const logout = useCallback(async () => {
    unauthenticate();

    sessionStorage.removeItem(SESSION_STORAGE_KEY.ACCESS_TOKEN);
    sessionStorage.removeItem(SESSION_STORAGE_KEY.EXPIRE_TIME);

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, [unauthenticate]);

  const updateLogoutTimer = useCallback(
    (expireTime: number) => {
      const remainingTime = expireTime - new Date().getTime();

      logoutTimer = setTimeout(() => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        logout();
      }, remainingTime);
    },
    [logout]
  );

  const authenticateMyInfo = useCallback(
    async (expireTime: number) => {
      fetchMyInfo()
        .then(unwrapResult)
        .then(() => {
          authenticate();
          updateLogoutTimer(expireTime);
        })
        .catch(logout);
    },
    [authenticate, fetchMyInfo, logout, updateLogoutTimer]
  );

  const login = useCallback(
    async ({ email, password }: MemberLoginRequest) => {
      const { data } = await requestLogin({ email, password });

      if (!data) {
        return;
      }

      const { accessToken, expires = 3_600_000 } = data;
      const expireTime = new Date().getTime() + expires;

      sessionStorage.setItem(SESSION_STORAGE_KEY.ACCESS_TOKEN, accessToken);
      sessionStorage.setItem(SESSION_STORAGE_KEY.EXPIRE_TIME, expireTime.toString());

      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      await authenticateMyInfo(expireTime);
    },
    [requestLogin, authenticateMyInfo]
  );

  useEffect(() => {
    const accessToken = sessionStorage.getItem(SESSION_STORAGE_KEY.ACCESS_TOKEN);
    const expireTime = Number(sessionStorage.getItem(SESSION_STORAGE_KEY.EXPIRE_TIME));

    if (accessToken && expireTime) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      (async () => {
        await authenticateMyInfo(expireTime);
      })();
    }
  }, [authenticateMyInfo]);

  return { isAuthenticated, isLoading, isFailed, signup, login, logout, myInfo, done, isSucceed };
};

export default useAuthProvider;
