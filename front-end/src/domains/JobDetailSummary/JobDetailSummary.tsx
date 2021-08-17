import { Text } from "../../components";
import { StyledJobDetailSummary, Anchor } from "./JobDetailSummary.styled";
import { JobViewResponse } from "../../types";

interface JobDetailSummaryProps {
  className?: string;
  detail: JobViewResponse;
}

const JobDetailSummary = ({ detail, ...rest }: JobDetailSummaryProps) => {
  const url = `https://hub.docker.com/${detail.metaData}`;

  return (
    <StyledJobDetailSummary {...rest}>
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
          <Anchor target="_blank" href={url} rel="noreferrer">
            {url}
          </Anchor>
        </Text>
      </div>
    </StyledJobDetailSummary>
  );
};

export default JobDetailSummary;
