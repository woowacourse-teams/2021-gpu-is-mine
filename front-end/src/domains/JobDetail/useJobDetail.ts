import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetJobDetail } from "../../hooks";

export const useJobId = () => {
  const { jobId } = useParams<{ jobId?: string }>();

  if (jobId == null || jobId === "" || Number.isNaN(Number(jobId))) {
    throw Error(`Invalid jobId in params: ${String(jobId)}`);
  }

  return Number(jobId);
};

export const useJobDetail = ({ labId, jobId }: { labId: number; jobId: number }) => {
  const { status, makeRequest, data, ...rest } = useGetJobDetail({ labId, jobId });

  useEffect(() => {
    makeRequest();
  }, [makeRequest]);

  return {
    status,
    detail: data,
    makeRequest,
    ...rest,
    isRunning: data?.status === "RUNNING",
    isWaiting: data?.status === "WAITING",
  };
};
