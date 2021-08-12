import { useEffect } from "react";
import { useGetGpuServerById } from "../../hooks";
import { GpuServer, JobViewResponse } from "../../types";

export const getCurrentJob = (server: GpuServer): JobViewResponse | undefined =>
  server.jobs.find((job) => job.status === "RUNNING");

export const getWaitingJob = (server: GpuServer): JobViewResponse[] =>
  server.jobs.filter((job) => job.status === "WAITING");

export const useGpuServerDetail = ({ labId, serverId }: { labId: number; serverId: number }) => {
  const { data, makeRequest, done, ...rest } = useGetGpuServerById({ labId, serverId });

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    makeRequest();

    return done;
  }, [makeRequest, done]);

  return { detail: data, makeRequest, done, ...rest };
};
