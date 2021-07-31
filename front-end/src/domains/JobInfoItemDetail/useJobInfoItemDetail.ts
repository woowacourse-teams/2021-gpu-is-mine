import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useAuth, useGetJobDetail } from "../../hooks";

export const useJobDetail = ({ labId, jobId }: { labId: number; jobId: number }) => {
  const { status, makeRequest, data } = useGetJobDetail({ labId, jobId });

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    makeRequest();
  }, [makeRequest]);

  return { status, detail: data };
};

export const useJobInfoItemDetail = () => {
  const history = useHistory();
  const { myInfo } = useAuth();
  const { jobId } = useParams<{ jobId?: string }>();

  const { status, detail } = useJobDetail({
    labId: myInfo?.labResponse.id ?? 1,
    jobId: Number(jobId),
  });

  const goToPreviousPage = () => history.go(-1);

  return { detail, goToPreviousPage, status };
};
