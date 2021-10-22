import { JobViewResponse } from "../../types";
import { Text } from "../../components";
import JobTable from "../JobTable/JobTable";
import { StyledGpuServerDetailJobTable, EmptyJobContainer } from "./GpuServerDetailJobTable.styled";

interface GpuServerDetailJobTableProps {
  jobs: Readonly<JobViewResponse[]>;
  className?: string;
}

const GpuServerDetailJobTable = ({ jobs, ...rest }: GpuServerDetailJobTableProps) => (
  <StyledGpuServerDetailJobTable {...rest}>
    <Text as="h3" weight="bold" size="lg">
      Job 목록
    </Text>
    {jobs.length ? (
      <JobTable jobs={jobs} rowCountPerPage={10} />
    ) : (
      <EmptyJobContainer>
        <Text size="md">Job이 존재하지 않습니다. Job을 추가해주세요.</Text>
      </EmptyJobContainer>
    )}
  </StyledGpuServerDetailJobTable>
);

export default GpuServerDetailJobTable;
