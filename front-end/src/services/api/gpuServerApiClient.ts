import type { AxiosError } from "axios";
import { API_ENDPOINT } from "../../constants";
import { httpClient, throwError } from "../../utils";
import type { GpuServerRegisterRequest, GpuServerViewResponses } from "../../types";

const fetchGpuServerAll = async (labId: number) =>
  httpClient.get<GpuServerViewResponses>(API_ENDPOINT.LABS(labId).GPUS);

const postGpuServer = async (labId: number, body: GpuServerRegisterRequest) => {
  try {
    await httpClient.post<{ message?: string }>(API_ENDPOINT.LABS(labId).GPUS, body);
  } catch (e) {
    const error = e as AxiosError<{ message: string }>;

    if (error?.response?.status === 400) {
      throwError("BadRequestError", error.response.data.message);
    }

    throw error;
  }
};

const deleteGpuServerById = async ({ labId, serverId }: { labId: number; serverId: number }) => {
  await httpClient.delete<never>(`${API_ENDPOINT.LABS(labId).GPUS}/${serverId}`);
};

const gpuServerApiClient = { fetchGpuServerAll, postGpuServer, deleteGpuServerById };

export default gpuServerApiClient;
