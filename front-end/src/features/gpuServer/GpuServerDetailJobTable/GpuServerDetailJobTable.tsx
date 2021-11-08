import { selectJobByIds } from "../../job/jobSlice";
import { useAppSelector } from "../../../app/hooks";
import { Text } from "../../../components";
import { JobTable } from "../../job";
import { StyledGpuServerDetailJobTable, EmptyJobContainer } from "./GpuServerDetailJobTable.styled";

interface GpuServerDetailJobTableProps {
  jobIds: number[];
  className?: string;
}

const GpuServerDetailJobTable = ({ jobIds, ...rest }: GpuServerDetailJobTableProps) => {
  const jobs = useAppSelector((state) => selectJobByIds(state, jobIds));

  return (
    <StyledGpuServerDetailJobTable {...rest}>
      <Text as="h3" weight="bold" size="lg">
        Job 목록
      </Text>
      {jobs.length > 0 ? (
        <JobTable jobs={jobs} rowCountPerPage={10} />
      ) : (
        <EmptyJobContainer>
          <Text size="md">Job이 존재하지 않습니다. Job을 추가해주세요.</Text>
        </EmptyJobContainer>
      )}
    </StyledGpuServerDetailJobTable>
  );
};

export default GpuServerDetailJobTable;
