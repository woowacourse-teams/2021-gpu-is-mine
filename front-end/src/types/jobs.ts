export type JobStatus = "WAITING" | "COMPLETED" | "CANCELED" | "RUNNING";

export interface Job {
  id: number;
  name: string;
  status: JobStatus;
}

export interface JobRegisterRequest {
  name: string;
  expectedTime: number;
  gpuServerId: number;
  metaData: string;
}

export interface JobViewResponse {
  id: number;
  name: string;
  status: JobStatus;
  memberId: number;
  memberName: string;
  gpuServerId: number;
  gpuServerName: string;
}

export interface JobViewResponses {
  jobResponses: Readonly<JobViewResponse[]>;
}

export type JobDetailResponse = JobViewResponse;
