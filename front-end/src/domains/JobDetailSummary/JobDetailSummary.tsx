import { Text } from "../../components";
import { StyledJobDetailSummary, SummaryList, Anchor } from "./JobDetailSummary.styled";
import { JobViewResponse } from "../../types";

interface JobDetailSummaryProps {
  title?: string;
  className?: string;
  detail: JobViewResponse;
}

const JobDetailSummary = ({ title, detail, ...rest }: JobDetailSummaryProps) => {
  const url = `https://hub.docker.com/r/${detail.metaData}`;

  return (
    <StyledJobDetailSummary {...rest}>
      <Text as="h3" weight="bold" size="lg">
        {title || detail.name}
      </Text>
      <SummaryList>
        {title && (
          <>
            <Text as="dt" weight="bold">
              Job 이름
            </Text>
            <Text as="dd">{detail.name}</Text>{" "}
          </>
        )}
        <Text as="dt" weight="bold">
          Job 상태
        </Text>
        <Text as="dd">{detail.status}</Text>

        <Text as="dt" weight="bold">
          Job 등록자
        </Text>
        <Text as="dd">{detail.memberName}</Text>

        <Text as="dt" weight="bold">
          할당된 서버
        </Text>
        <Text as="dd">{detail.gpuServerName}</Text>

        <Text as="dt" weight="bold">
          {detail.status === "RUNNING" ? "" : "예상 "}실행시간(hour)
        </Text>
        <Text as="dd">{detail.expectedTime}</Text>

        <Text as="dt" weight="bold">
          DockerHub Image
        </Text>
        <Text as="dd">
          <Anchor target="_blank" href={url} rel="noreferrer">
            {detail.metaData}
          </Anchor>
        </Text>
      </SummaryList>
    </StyledJobDetailSummary>
  );
};

export default JobDetailSummary;
