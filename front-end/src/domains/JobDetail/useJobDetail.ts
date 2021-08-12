import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useGetJobDetail } from "../../hooks";

export const useGoToPage = (pointer: number) => {
  const history = useHistory();

  return () => history.go(pointer);
};

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
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    makeRequest();
  }, [makeRequest]);

  return { status, detail: data, ...rest };
};
