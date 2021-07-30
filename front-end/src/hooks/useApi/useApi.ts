import useFetch from "../useFetch/useFetch";
import { API_ENDPOINT } from "../../constants";
import {
  JobViewResponse,
  MyInfoResponse,
  MemberLoginResponse,
  MemberLoginRequest,
  MemberSignupRequest,
} from "../../types";

// eslint-disable-next-line import/prefer-default-export
export const useGetJobDetail = ({ labId, jobId }: { labId: number; jobId: number }) =>
  useFetch<JobViewResponse>(`${API_ENDPOINT.LABS(labId).JOBS}/${jobId}`, {
    method: "post",
  });

export const useGetMyInfo = () =>
  useFetch<MyInfoResponse>(API_ENDPOINT.ME, {
    method: "get",
  });

export const usePostLogin = () =>
  useFetch<MemberLoginResponse, MemberLoginRequest>(API_ENDPOINT.LOGIN, {
    method: "post",
  });

export const usePostSignup = () =>
  useFetch<void, MemberSignupRequest>(API_ENDPOINT.MEMBERS, {
    method: "post",
  });
