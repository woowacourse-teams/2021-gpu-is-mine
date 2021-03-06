export type JobStatus = "WAITING" | "COMPLETED" | "CANCELED" | "RUNNING" | "FAILED";

export interface Job {
  id: number;
  name: string;
  status: JobStatus;
}

export interface JobRegisterRequest {
  name: string;
  expectedTime: string;
  gpuServerId: number;
  metaData: string;
}

export type JobViewResponse = {
  id: number;
  name: string;
  status: JobStatus;
  memberId: number;
  memberName: string;
  gpuServerId: number;
  gpuServerName: string;
  expectedTime: string;
  metaData: string;
  calculatedTime: {
    createdTime: string | null;
    startedTime: string | null;
    expectedStartedTime: string | null;
    completedTime: string | null;
    expectedCompletedTime: string | null;
  };
};

export interface JobViewResponses {
  jobResponses: JobViewResponse[];
}

export type JobDetailResponse = JobViewResponse;

export type JobDetailLogResponse = { logs: string[] };

export type ParsedLog = {
  [x in "currentEpoch" | "totalEpoch" | "loss" | "accuracy"]: number;
};

export type ParsedLogResponse = { parsedLogResponses: Readonly<ParsedLog[]> };
