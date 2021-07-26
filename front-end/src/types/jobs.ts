type JobStatus = "WAITING" | "COMPLETED" | "CANCELED" | "RUNNING";

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
