import { JobViewResponse } from "./jobs";

export interface GpuBoard {
  id: number;
  performance: number;
  modelName: string;
  isWorking: boolean;
}

export interface GpuServerDetail {
  id: number;
  serverName: string;
  isOn: boolean;
  memorySize: number;
  diskSize: number;
  gpuBoard: GpuBoard;
  jobs: JobViewResponse[];
}

export type GpuServerViewRequest = Pick<
  GpuServerDetail,
  "memorySize" | "diskSize" | "gpuBoard" | "serverName"
>;

export type GpuServerViewDetailResponse = GpuServerDetail;

type RunningJob = { id: number; name: string; status: "RUNNING"; memberId: number };

export type SimpleGpuServer = {
  id: number;
  serverName: string;
  isOn: boolean;
  memorySize: number;
  diskSize: number;
  gpuBoard: GpuBoard;
  runningJobs: RunningJob[];
  waitingJobCount: number;
  totalExpectedTime: number;
};

export type GpuServerViewResponse = SimpleGpuServer;

export type GpuServerViewResponses = {
  gpuServers: GpuServerViewResponse[];
};

type GpuBoardRequest = Pick<GpuBoard, "modelName" | "performance">;

export type GpuServerRegisterRequest = Pick<
  GpuServerDetail,
  "memorySize" | "diskSize" | "serverName"
> & {
  gpuBoardRequest: GpuBoardRequest;
};
