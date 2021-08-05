import { useEffect } from "react";
import { useGetJobAll } from "../../hooks";
import { Text, Loading } from "../../components";
import JobInfoItem from "../JobInfoItem/JobInfoItem";
import { StyledJobInfoList } from "./JobInfoList.styled";
import { MESSAGE } from "../../constants";
import { JobViewResponse } from "../../types";

const priority = {
  RUNNING: 0, // highest
  WAITING: 1,
  COMPLETED: 2,
  CANCELED: 3, // lowest
} as const;

const sorbByResponse = (a: JobViewResponse, b: JobViewResponse) =>
  priority[a.status] - priority[b.status];

const JobInfoList = () => {
  // TODO: useLabId 커스텀 훅 에러 바운더리 처리 => labId 상수값 대체하기
  const labId = 1;

  const { data, status, makeRequest } = useGetJobAll({ labId });

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
              .map((res) => (
                <JobInfoItem key={res.id} refresh={() => makeRequest()} labId={labId} {...res} />
              ))
          )}
        </StyledJobInfoList>
      )}
    </>
  );
};

export default JobInfoList;
