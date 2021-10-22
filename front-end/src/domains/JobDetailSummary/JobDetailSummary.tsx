import { Text } from "../../components";
import { StyledJobDetailSummary } from "./JobDetailSummary.styled";
import { JobViewResponse } from "../../types";
import JobDetailSummaryContent from "../JobDetailSummaryContent/JobDetailSummaryContent";

interface JobDetailSummaryProps {
  title?: string;
  className?: string;
  detail: JobViewResponse;
}

const JobDetailSummary = ({ title, detail, ...rest }: JobDetailSummaryProps) => {
  const { name, status, memberName, gpuServerName, expectedTime, metaData } = detail;

  const detailList = [
    { title: "Job 이름", content: name, isLink: false },
    { title: "Job 상태", content: status, isLink: false },
    { title: "Job 등록자", content: memberName, isLink: false },
    { title: "할당된 서버", content: gpuServerName, isLink: false },
    { title: "실행시간(hour)", content: expectedTime, isLink: false },
    { title: "DockerHub Image", content: metaData, isLink: true },
  ];

  return (
    <StyledJobDetailSummary {...rest}>
      <Text as="h3" weight="bold" size="lg">
        {detail.name}
      </Text>
      <JobDetailSummaryContent detailList={detailList} />
    </StyledJobDetailSummary>
  );
};

export default JobDetailSummary;
