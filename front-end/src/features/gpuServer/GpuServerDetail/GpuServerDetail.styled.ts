import styled from "styled-components";
import GpuServerDetailSummary from "../GpuServerDetailSummary/GpuServerDetailSummary";
import GpuServerDetailCurrentJob from "../GpuServerDetailCurrentJob/GpuServerDetailCurrentJob";
import GpuServerDetailJobTable from "../GpuServerDetailJobTable/GpuServerDetailJobTable";
import { Text } from "../../../components";
import { cardStyle } from "../../../styles";

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

export const NoCurrentJobCard = styled.div`
  grid-area: current-job;
  display: flex;
  flex-direction: column;

  ${cardStyle};
`;

export const StyledNoContent = styled(Text)`
  margin: auto;
`;

export const StyledGpuServerDetailJobTable = styled(GpuServerDetailJobTable)`
  grid-area: waiting-job;
`;
