import { API_ENDPOINT } from "../../constants";
import { httpClient } from "../../utils";
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
  await httpClient.post<{ message?: string }>(API_ENDPOINT.LABS(labId).GPUS, body);
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
