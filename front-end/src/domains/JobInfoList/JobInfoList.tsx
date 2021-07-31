import { useEffect } from "react";
import { useFetch } from "../../hooks";
import { Text, Loading } from "../../components";
import JobInfoItem from "../JobInfoItem/JobInfoItem";
import { StyledJobInfoList } from "./JobInfoList.styled";
import { API_ENDPOINT, MESSAGE } from "../../constants";
import { JobViewResponse, JobViewResponses } from "../../types";

const priority = {
  RUNNING: 0, // highest
  WAITING: 1,
  COMPLETED: 2,
  CANCELED: 3, // lowest
} as const;

const sorbByResponse = (a: JobViewResponse, b: JobViewResponse) =>
  priority[a.status] - priority[b.status];

const JobInfoList = () => {
  const { data, status, makeRequest } = useFetch<JobViewResponses>(API_ENDPOINT.LABS(1).JOBS, {
    method: "get",
  });

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    makeRequest();
  }, [makeRequest]);

  return (
    <>
      {status === "loading" && <Loading size="lg" />}
      {status === "failed" && (
        <Text size="lg" weight="bold">
          {MESSAGE.ERROR.SERVER}
        </Text>
      )}

      {status === "succeed" && data && (
        <StyledJobInfoList>
          {data.jobResponses.length === 0 ? (
            <Text size="lg" weight="bold">
              🚫 등록된 작업이 존재하지 않습니다.
            </Text>
          ) : (
            data.jobResponses
              .slice()
              .sort(sorbByResponse)
              .map((res) => <JobInfoItem refresh={makeRequest} key={res.id} {...res} />)
          )}
        </StyledJobInfoList>
      )}
    </>
  );
};

export default JobInfoList;
