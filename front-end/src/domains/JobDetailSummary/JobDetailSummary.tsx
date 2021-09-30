import { Text } from "../../components";
import {
  StyledJobDetailSummary,
  StyledJobDetailSummaryList,
  Anchor,
} from "./JobDetailSummary.styled";
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
        {detail.name}
      </Text>
      <StyledJobDetailSummaryList>
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
          {detail.status === "RUNNING" ? "" : "예상 "}실행시간
        </Text>
        <Text as="dd">{detail.expectedTime}</Text>

        <Text as="dt" weight="bold">
          DockerHub URL
        </Text>
        <Text as="dd">
          <Anchor target="_blank" href={url} rel="noreferrer">
            {url}
          </Anchor>
        </Text>
      </StyledJobDetailSummaryList>
    </StyledJobDetailSummary>
  );
};

export default JobDetailSummary;
