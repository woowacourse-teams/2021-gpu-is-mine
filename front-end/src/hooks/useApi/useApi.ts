import useFetch from "../useFetch/useFetch";
import { API_ENDPOINT } from "../../constants";
import {
  JobDetailResponse,
  MyInfoResponse,
  MemberLoginResponse,
  MemberLoginRequest,
  MemberSignupRequest,
  GpuServerRegisterRequest,
  JobDetailLogResponse,
} from "../../types";

export const useGetJobDetail = ({ labId, jobId }: { labId: number; jobId: number }) =>
  useFetch<JobDetailResponse>(`${API_ENDPOINT.LABS(labId).JOBS}/${jobId}`, {
    method: "get",
  });

export const useGetJobDetailLog = ({ labId, jobId }: { labId: number; jobId: number }) =>
  useFetch<JobDetailLogResponse>(`${API_ENDPOINT.LABS(labId).JOBS}/${jobId}/logs`, {
    method: "get",
  });

export const usePutJobDetail = ({ labId, jobId }: { labId: number; jobId: number }) =>
  useFetch(`${API_ENDPOINT.LABS(labId).JOBS}/${jobId}`, {
    method: "put",
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

export const usePostGpuServer = () =>
  useFetch<void, GpuServerRegisterRequest>(API_ENDPOINT.LABS(1).GPUS, { method: "post" });
