import { API_ENDPOINT } from "../../constants";
import { httpClient, isAxiosError, throwError } from "../../utils";
import type {
  GpuServerRegisterRequest,
  GpuServerViewDetailResponse,
  GpuServerViewResponses,
} from "../../types";

const fetchGpuServerAll = async (labId: number) =>
  httpClient.get<GpuServerViewResponses>(API_ENDPOINT.LABS(labId).GPUS);

const fetchGpuServerById = async ({ labId, serverId }: { labId: number; serverId: number }) =>
  httpClient.get<GpuServerViewDetailResponse>(`${API_ENDPOINT.LABS(labId).GPUS}/${serverId}`);

const postGpuServer = async (labId: number, body: GpuServerRegisterRequest) => {
  try {
    await httpClient.post<{ message?: string }>(API_ENDPOINT.LABS(labId).GPUS, body);
  } catch (error) {
    if (!isAxiosError<{ message: string }>(error)) {
      console.error(error);
      throwError("UnknownError", "관리자에게 문의해주세요");
      throw error;
    }

    // Network Error
    if (error.message === "Network Error") {
      throwError("NetworkError", "잠시 후 다시 시도해주세요");
    }

    if (/^4/.test(error.response?.status.toString() ?? "")) {
      throwError("BadRequestError", error.response!.data.message);
    }

    if (/^5/.test(error.response?.status.toString() ?? "")) {
      throwError("InternalError", "관리자에게 문의해주세요");
    }
  }
};

const deleteGpuServerById = async ({ labId, serverId }: { labId: number; serverId: number }) => {
  await httpClient.delete<never>(`${API_ENDPOINT.LABS(labId).GPUS}/${serverId}`);
};

const gpuServerApiClient = {
  fetchGpuServerAll,
  fetchGpuServerById,
  postGpuServer,
  deleteGpuServerById,
};

export default gpuServerApiClient;
