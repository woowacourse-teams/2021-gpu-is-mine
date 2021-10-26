/* eslint-disable class-methods-use-this */
import { API_ENDPOINT } from "../../constants";
import { httpClient } from "../../utils";
import type {
  JobDetailLogResponse,
  JobRegisterRequest,
  JobViewResponse,
  JobViewResponses,
  ParsedLogResponse,
} from "../../types";

type RequestJobById = {
  [key in "labId" | "jobId"]: number;
};

const getJobAll = async ({ labId }: { labId: number }) => {
  const { data } = await httpClient.get<JobViewResponses>(API_ENDPOINT.LABS(labId).JOBS);

  return data;
};

const getJobById = async ({ labId, jobId }: RequestJobById) => {
  const { data } = await httpClient.get<JobViewResponse>(
    `${API_ENDPOINT.LABS(labId).JOBS}/${jobId}`
  );

  return data;
};

const postJob = async ({
  labId,
  name,
  expectedTime,
  gpuServerId,
  metaData,
}: { labId: number } & JobRegisterRequest) => {
  const reqBody = {
    name,
    gpuServerId,
    expectedTime,
    metaData,
  };

  await httpClient.post(API_ENDPOINT.LABS(labId).JOBS, reqBody);
};

const putJobById = async ({ labId, jobId }: RequestJobById) => {
  await httpClient.put(`${API_ENDPOINT.LABS(labId).JOBS}/${jobId}/cancel`);
};

const getJobLogById = async ({ labId, jobId }: RequestJobById) => {
  const { data } = await httpClient.get<JobDetailLogResponse>(
    `${API_ENDPOINT.LABS(labId).JOBS}/${jobId}/logs`
  );

  return data;
};

const getJobGraphById = async ({ labId, jobId }: RequestJobById) => {
  const { data } = await httpClient.get<ParsedLogResponse>(
    `${API_ENDPOINT.LABS(labId).JOBS}/${jobId}/logs-graph`
  );

  return data;
};

const client = { getJobAll, getJobById, postJob, putJobById, getJobLogById, getJobGraphById };

export default client;
