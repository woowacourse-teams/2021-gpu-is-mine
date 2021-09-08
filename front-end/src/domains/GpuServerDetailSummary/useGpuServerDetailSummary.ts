import { GpuServerDetail, JobViewResponse } from "../../types";

export const getCurrentJob = (server: GpuServerDetail): JobViewResponse | undefined =>
  server.jobs.find((job) => job.status === "RUNNING");

export const getWaitingJob = (server: GpuServerDetail): JobViewResponse[] =>
  server.jobs.filter((job) => job.status === "WAITING");
