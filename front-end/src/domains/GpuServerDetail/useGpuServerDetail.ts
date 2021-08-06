import { useParams } from "react-router-dom";
import { GpuServer, JobViewResponse } from "../../types";

export const getCurrentJob = (server: GpuServer): JobViewResponse | undefined =>
  server.jobs.find((job) => job.status === "RUNNING");

export const getWaitingJob = (server: GpuServer): JobViewResponse[] =>
  server.jobs.filter((job) => job.status === "WAITING");

export const useServerId = () => {
  const { serverId } = useParams<{ serverId?: string }>();

  if (serverId == null || serverId === "" || Number.isNaN(Number(serverId))) {
    throw Error(`Invalid serverId in params: ${String(serverId)}`);
  }

  return Number(serverId);
};
