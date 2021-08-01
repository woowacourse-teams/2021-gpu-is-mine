import { useGoToPage, useJobId, useJobDetail, useLabId } from "./useJobDetail";
import { Loading, Text, Alert } from "../../components";
import {
  StyledJobDetail,
  JobSummaryContainer,
  GraphContainer,
  LogContainer,
  LogConsole,
  Graph,
  Anchor,
} from "./JobDetail.styled";
import { logData } from "../../__fixtures__";

const JobDetail = () => {
  const labId = useLabId();
  const jobId = useJobId();

  const { detail, status } = useJobDetail({ labId, jobId });

  const goToPreviousPage = useGoToPage(-1);

  return (
    <>
      {status === "loading" && <Loading size="lg" />}
      {status === "failed" && (
        <Alert onConfirm={goToPreviousPage}>
          <Text>Job 상세 조회에 실패했습니다.</Text>
        </Alert>
      )}
      {status === "succeed" && detail && (
        <StyledJobDetail>
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
              <Text>{detail.expectedTime}</Text>
            </div>
            <div>
              <Text as="h4" weight="bold">
                DockerHub URL
              </Text>
              <Text>
                <Anchor
                  target="_blank"
                  href={`https://hub.docker.com/${detail.metaData}`}
                  rel="noreferrer"
                >
                  {`https://hub.docker.com/${detail.metaData}`}
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
        </StyledJobDetail>
      )}
    </>
  );
};

export default JobDetail;
