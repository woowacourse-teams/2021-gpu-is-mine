import { Text } from "../../components";
import { StyledJobDetailSummary } from "./JobDetailSummary.styled";
import JobDetailSummaryContent from "../JobDetailSummaryContent/JobDetailSummaryContent";
import { Job } from "../../features/job/jobSlice";

interface JobDetailSummaryProps {
  title?: string;
  className?: string;
  detail: Job;
}

const JobDetailSummary = ({ title, detail, ...rest }: JobDetailSummaryProps) => {
  const { name, status, memberName, gpuServerName, expectedTime, dockerHubImage } = detail;

  const detailList = [
    { title: "Job 이름", content: name, isLink: false },
    { title: "Job 상태", content: status, isLink: false },
    { title: "Job 등록자", content: memberName, isLink: false },
    { title: "할당된 서버", content: gpuServerName, isLink: false },
    { title: "실행시간(hour)", content: expectedTime, isLink: false },
    { title: "DockerHub Image", content: dockerHubImage, isLink: true },
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
