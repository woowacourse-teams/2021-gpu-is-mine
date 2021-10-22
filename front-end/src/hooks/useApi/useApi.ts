import useFetch from "../useFetch/useFetch";
import { API_ENDPOINT } from "../../constants";
import {
  JobViewResponses,
  JobRegisterRequest,
  JobDetailResponse,
  MyInfoResponse,
  MemberLoginResponse,
  MemberLoginRequest,
  MemberSignupRequest,
  GpuServerRegisterRequest,
  JobDetailLogResponse,
  GpuServerViewResponses,
  GpuServerViewDetailResponse,
  ParsedLogResponse,
} from "../../types";

export const useGetJobAll = ({ labId }: { labId: number }) =>
  useFetch<JobViewResponses>(API_ENDPOINT.LABS(labId).JOBS, {
    method: "get",
  });

export const usePostJobRegister = ({ labId }: { labId: number }) =>
  useFetch<void, JobRegisterRequest>(API_ENDPOINT.LABS(labId).JOBS, {
    method: "post",
  });

export const useGetJobDetail = ({ labId, jobId }: { labId: number; jobId: number }) =>
  useFetch<JobDetailResponse>(`${API_ENDPOINT.LABS(labId).JOBS}/${jobId}`, {
    method: "get",
  });

export const useGetJobDetailLog = ({ labId, jobId }: { labId: number; jobId: number }) =>
  useFetch<JobDetailLogResponse>(`${API_ENDPOINT.LABS(labId).JOBS}/${jobId}/logs`, {
    method: "get",
  });

export const useGetJobDetailLogForGraph = ({ labId, jobId }: { labId: number; jobId: number }) =>
  useFetch<ParsedLogResponse>(`${API_ENDPOINT.LABS(labId).JOBS}/${jobId}/logs-graph`, {
    method: "get",
  });

export const useCancelJob = ({ labId, jobId }: { labId: number; jobId: number }) =>
  useFetch(`${API_ENDPOINT.LABS(labId).JOBS}/${jobId}/cancel`, {
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

export const useGetGpuServerAll = ({ labId }: { labId: number }) =>
  useFetch<GpuServerViewResponses>(API_ENDPOINT.LABS(labId).GPUS, {
    method: "get",
  });

export const useGetGpuServerById = ({ labId, serverId }: { labId: number; serverId: number }) =>
  useFetch<GpuServerViewDetailResponse>(`${API_ENDPOINT.LABS(labId).GPUS}/${serverId}`, {
    method: "get",
  });

export const usePostGpuServer = ({ labId }: { labId: number }) =>
  useFetch<void, GpuServerRegisterRequest>(API_ENDPOINT.LABS(labId).GPUS, {
    method: "post",
  });

export const useDeleteGpuServer = ({ labId, serverId }: { labId: number; serverId: number }) =>
  useFetch<void>(`${API_ENDPOINT.LABS(labId).GPUS}/${serverId}`, {
    method: "delete",
  });
