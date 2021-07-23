import { GpuServer } from "./gpuServer";

export interface JobRegisterRequest {
  name: string;
  expectedTime: number;
  gpuServerId: GpuServer["id"];
  metaData: string;
}
