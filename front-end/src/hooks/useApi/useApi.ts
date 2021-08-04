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
} from "../../types";

export const useGetJobAll = ({ labId }: { labId: number }) =>
  useFetch<JobViewResponses>(API_ENDPOINT.LABS(labId).JOBS, {
    method: "get",
  });

export const usePostJobRegister = ({ labId }: { labId: number }) =>
  useFetch<void, JobRegisterRequest>(API_ENDPOINT.LABS(labId).JOBS, {
    method: "post",
    relatedKey: [API_ENDPOINT.LABS(labId).JOBS, API_ENDPOINT.LABS(labId).GPUS],
  });

export const useGetJobDetail = ({ labId, jobId }: { labId: number; jobId: number }) =>
  useFetch<JobDetailResponse>(`${API_ENDPOINT.LABS(labId).JOBS}/${jobId}`, {
    method: "get",
    relatedKey: [API_ENDPOINT.LABS(labId).JOBS],
  });

export const useGetJobDetailLog = ({ labId, jobId }: { labId: number; jobId: number }) =>
  useFetch<JobDetailLogResponse>(`${API_ENDPOINT.LABS(labId).JOBS}/${jobId}/logs`, {
    method: "get",
    relatedKey: [API_ENDPOINT.LABS(labId).JOBS],
  });

export const useCancelJob = ({ labId, jobId }: { labId: number; jobId: number }) =>
  useFetch(`${API_ENDPOINT.LABS(labId).JOBS}/${jobId}`, {
    method: "put",
    relatedKey: [API_ENDPOINT.LABS(labId).JOBS],
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

export const usePostGpuServer = ({ labId }: { labId: number }) =>
  useFetch<void, GpuServerRegisterRequest>(API_ENDPOINT.LABS(labId).GPUS, {
    method: "post",
    relatedKey: [`${API_ENDPOINT.LABS(labId).GPUS}`],
  });

export const useDeleteGpuServer = ({ labId, serverId }: { labId: number; serverId: number }) =>
  useFetch<void>(`${API_ENDPOINT.LABS(labId).GPUS}/${serverId}`, {
    method: "delete",
    relatedKey: [`${API_ENDPOINT.LABS(labId).GPUS}`],
  });
