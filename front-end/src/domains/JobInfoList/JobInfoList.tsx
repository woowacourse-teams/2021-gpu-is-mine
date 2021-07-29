import { useEffect } from "react";
import { useFetch } from "../../hooks";
import { Text, Loading } from "../../components";
import JobInfoItem from "../JobInfoItem/JobInfoItem";
import { StyledJobInfoList } from "./JobInfoList.styled";
import { API_ENDPOINT, MESSAGE } from "../../constants";
import { JobViewResponses } from "../../types";

const JobInfoList = () => {
  const queryParam = "?memberId=1"; // TODO: 추후 api 변경시 교체

  const { data, status, makeRequest } = useFetch<JobViewResponses>(
    API_ENDPOINT.LABS(1).JOBS + queryParam,
    {
      method: "get",
    }
  );

  useEffect(() => {
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
