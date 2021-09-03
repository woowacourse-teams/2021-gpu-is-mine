import { useCallback, useEffect } from "react";
import useBoolean from "../useBoolean/useBoolean";
import { usePostLogin, useGetMyInfo, usePostSignup } from "../useApi/useApi";
import { MemberLoginRequest, MemberSignupRequest } from "../../types";
import { unwrapResult } from "../useFetch/useFetch";
import { SESSION_STORAGE_KEY } from "../../constants";

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

  const { isLoading, isFailed, requestLogin, requestSignup, fetchMyInfo, myInfo, done, isSucceed } =
    useRequest();

  const signup = useCallback(
    async ({ email, labId, password, name, memberType }: MemberSignupRequest) => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      requestSignup({ email, labId, password, name, memberType });
    },
    [requestSignup]
  );

  const login = useCallback(
    async ({ email, password }: MemberLoginRequest) => {
      const { data } = await requestLogin({ email, password });
      if (!data) {
        return;
      }
      const { accessToken } = data;

      sessionStorage.setItem(SESSION_STORAGE_KEY.ACCESS_TOKEN, accessToken);

      const { error } = await fetchMyInfo();

      if (error) {
        sessionStorage.removeItem(SESSION_STORAGE_KEY.ACCESS_TOKEN);

        return;
      }

      authenticate();
    },
    [authenticate, fetchMyInfo, requestLogin]
  );

  const logout = useCallback(async () => {
    unauthenticate();

    sessionStorage.removeItem(SESSION_STORAGE_KEY.ACCESS_TOKEN);
  }, [unauthenticate]);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_STORAGE_KEY.ACCESS_TOKEN)) {
      fetchMyInfo().then(unwrapResult).then(authenticate).catch(logout);
    }
  }, [authenticate, fetchMyInfo, logout]);

  return { isAuthenticated, isLoading, isFailed, signup, login, logout, myInfo, done, isSucceed };
};

export default useAuthProvider;
