import { GpuServer, JobViewResponse } from "../../types";

export const getCurrentJob = (server: GpuServer): JobViewResponse | undefined =>
  server.jobs.find((job) => job.status === "RUNNING");

export const getWaitingJob = (server: GpuServer): JobViewResponse[] =>
  server.jobs.filter((job) => job.status === "WAITING");
