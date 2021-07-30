import useFetch from "../useFetch/useFetch";
import { API_ENDPOINT } from "../../constants";
import {
  JobDetailResponse,
  MyInfoResponse,
  MemberLoginResponse,
  MemberLoginRequest,
  MemberSignupRequest,
} from "../../types";

// eslint-disable-next-line import/prefer-default-export
export const useGetJobDetail = ({ labId, jobId }: { labId: number; jobId: number }) =>
  useFetch<JobDetailResponse>(`${API_ENDPOINT.LABS(labId).JOBS}/${jobId}`, {
    method: "get",
  });

export const useGetMyInfo = () =>
  useFetch<MyInfoResponse>(API_ENDPOINT.MEMBER.ME, {
    method: "get",
  });

export const usePostLogin = () =>
  useFetch<MemberLoginResponse, MemberLoginRequest>(API_ENDPOINT.MEMBER.LOGIN, {
    method: "post",
  });

export const usePostSignup = () =>
  useFetch<void, MemberSignupRequest>(API_ENDPOINT.MEMBER.SIGNUP, {
    method: "post",
  });
