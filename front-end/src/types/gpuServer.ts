type JobStatus = "WAITING" | "COMPLETED" | "CANCELED" | "RUNNING";

interface Job {
  id: number;
  name: string;
  status: JobStatus;
}

interface GpuBoard {
  id: number;
  performance: number;
  modelName: string;
  isWorking: boolean;
}

interface GpuServer {
  id: number;
  serverName: string;
  isOn: boolean;
  memorySize: number;
  diskSize: number;
  gpuBoard: GpuBoard;
  jobs: Readonly<Job[]>;
}

export type GpuServerViewRequest = Pick<
  GpuServer,
  "memorySize" | "diskSize" | "gpuBoard" | "serverName"
>;

export type GpuServerViewResponse = GpuServer;

export type GpuServerViewResponses = {
  gpuServers: Readonly<GpuServerViewResponse[]>;
};

type GpuBoardRequest = Pick<GpuBoard, "modelName" | "performance">;

export type GpuServerRegisterRequest = Pick<GpuServer, "memorySize" | "diskSize" | "serverName"> & {
  gpuBoardRequest: GpuBoardRequest;
};
