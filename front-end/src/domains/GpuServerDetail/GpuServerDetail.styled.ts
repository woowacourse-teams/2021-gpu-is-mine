import styled from "styled-components";
import GpuServerDetailSummary from "../GpuServerDetailSummary/GpuServerDetailSummary";
import GpuServerDetailCurrentJob from "../GpuServerDetailCurrentJob/GpuServerDetailCurrentJob";
import GpuServerDetailJobTable from "../GpuServerDetailJobTable/GpuServerDetailJobTable";

export const StyledGpuServerDetail = styled.section`
  width: 100%;

  display: grid;
  grid-template-areas:
    "summary         current-job"
    "waiting-job     waiting-job";

  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: max-content;
  column-gap: 1rem;
  row-gap: 2rem;
`;

export const StyledGpuServerDetailSummary = styled(GpuServerDetailSummary)`
  grid-area: summary;
`;

export const StyledGpuServerDetailCurrentJob = styled(GpuServerDetailCurrentJob)`
  grid-area: current-job;
`;

export const StyledGpuServerDetailJobTable = styled(GpuServerDetailJobTable)`
  grid-area: waiting-job;
`;
