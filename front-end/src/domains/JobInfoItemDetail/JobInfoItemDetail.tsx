import { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useGetJobDetail, useAuth } from "../../hooks";
import { Loading, Text, Alert } from "../../components";
import {
  StyledJobInfoItemDetail,
  JobSummaryContainer,
  GraphContainer,
  LogContainer,
  LogConsole,
  Graph,
  Anchor,
} from "./JobInfoItemDetail.styled";
import { MyInfoResponse } from "../../types";
import { logData } from "../../__fixtures__/jobsResponses";

const useJobDetail = ({ labId, jobId }: { labId: number; jobId: number }) => {
  const { status, makeRequest, data } = useGetJobDetail({ labId, jobId });

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    makeRequest();
  }, [makeRequest]);

  return { status, detail: data };
};

const JobInfoItemDetail = () => {
  const history = useHistory();

  const { myInfo } = useAuth() as { myInfo: MyInfoResponse };

  const { jobId } = useParams<{ jobId?: string }>();

  const { status, detail } = useJobDetail({ labId: myInfo.labResponse.id, jobId: Number(jobId) });

  const goToPreviousPage = () => history.go(-1);

  return (
    <>
      {status === "loading" && <Loading size="lg" />}
      {status === "failed" && (
        <Alert onConfirm={goToPreviousPage}>
          <Text>Job 상세 조회에 실패했습니다.</Text>
        </Alert>
      )}
      {status === "succeed" && detail && (
        <StyledJobInfoItemDetail>
          <JobSummaryContainer>
            <Text as="h3" weight="bold" size="lg">
              요약 정보
            </Text>
            <div>
              <Text as="h4" weight="bold">
                Job 이름
              </Text>
              <Text>{detail.name}</Text>
            </div>
            <div>
              <Text as="h4" weight="bold">
                Job 상태
              </Text>
              <Text>{detail.status}</Text>
            </div>
            <div>
              <Text as="h4" weight="bold">
                Job 등록자
              </Text>
              <Text>{detail.memberName}</Text>
            </div>
            <div>
              <Text as="h4" weight="bold">
                할당된 서버
              </Text>
              <Text>{detail.gpuServerName}</Text>
            </div>
            <div>
              <Text as="h4" weight="bold">
                {detail.status === "RUNNING" ? "" : "예상 "}실행시간
              </Text>
              <Text>{/* TODO: detail.expectedTime으로 수정 */} 3.5시간</Text>
            </div>
            <div>
              <Text as="h4" weight="bold">
                DockerHub URL
              </Text>
              <Text>
                {/* TODO: detail.metaData로 수정 */}
                <Anchor target="_blank" href="https://hub.docker.com/abcdefg" rel="noreferrer">
                  https://hub.docker.com/abcdefg
                </Anchor>
              </Text>
            </div>
          </JobSummaryContainer>
          <GraphContainer>
            <Text as="h3" weight="bold" size="lg">
              그래프
            </Text>
            <Graph />
          </GraphContainer>
          <LogContainer>
            <Text as="h3" weight="bold" size="lg">
              Log
            </Text>
            <LogConsole>
              {logData.split("/").map((line, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <Text size="sm" key={`${line}_${index}`}>
                  {line}
                </Text>
              ))}
            </LogConsole>
          </LogContainer>
        </StyledJobInfoItemDetail>
      )}
    </>
  );
};

export default JobInfoItemDetail;
