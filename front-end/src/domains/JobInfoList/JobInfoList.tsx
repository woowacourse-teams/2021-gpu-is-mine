import { useEffect } from "react";
import { useFetch } from "../../hooks";
import { Text, Loading } from "../../components";
import JobInfoItem from "../JobInfoItem/JobInfoItem";
import { StyledJobInfoList } from "./JobInfoList.styled";
import { API_ENDPOINT } from "../../constants";
import { JobViewResponses } from "../../types";

interface JobInfoListProps {}

const queryParam = "?memberId=1";

const JobInfoList = ({}: JobInfoListProps) => {
  const { data, status, makeRequest } = useFetch<JobViewResponses>(
    API_ENDPOINT.LABS(1).JOBS + queryParam,
    {
      method: "get",
    }
  );

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    makeRequest();
  }, [makeRequest]);

  return (
    <>
      {status === "loading" && <Loading size="lg" />}
      {status === "failed" && (
        <Text size="lg" weight="bold">
          🚫 장애가 발생했습니다. 관리자에게 문의해주세요.
        </Text>
      )}

      {status === "succeed" && (
        <StyledJobInfoList>
          {data?.jobResponses.length === 0 ? (
            <Text size="lg" weight="bold">
              🚫 등록된 작업이 존재하지 않습니다.
            </Text>
          ) : (
            data?.jobResponses.map((res) => (
              <JobInfoItem refresh={makeRequest} key={res.id} {...res} />
            ))
          )}
        </StyledJobInfoList>
      )}
    </>
  );
};

export default JobInfoList;
