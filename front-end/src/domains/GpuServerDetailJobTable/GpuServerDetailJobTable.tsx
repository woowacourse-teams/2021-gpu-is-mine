import { JobViewResponse } from "../../types";
import { Text } from "../../components";
import JobTable from "../JobTable/JobTable";
import { StyledGpuServerDetailJobTable } from "./GpuServerDetailJobTable.styled";

interface GpuServerDetailJobTableProps {
  jobs: Readonly<JobViewResponse[]>;
  className?: string;
}

const GpuServerDetailJobTable = ({ jobs, ...rest }: GpuServerDetailJobTableProps) => (
  <StyledGpuServerDetailJobTable {...rest}>
    <Text weight="bold" size="lg">
      Job 목록
    </Text>
    <JobTable jobs={jobs} rowCountPerPage={10} />
  </StyledGpuServerDetailJobTable>
);

export default GpuServerDetailJobTable;
