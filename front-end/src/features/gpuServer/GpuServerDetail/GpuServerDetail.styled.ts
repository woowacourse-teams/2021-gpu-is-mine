import styled from "styled-components";
import { up } from "styled-breakpoints";
import { Text } from "../../../components";
import GpuServerDetailSummary from "../GpuServerDetailSummary/GpuServerDetailSummary";
import GpuServerDetailCurrentJob from "../GpuServerDetailCurrentJob/GpuServerDetailCurrentJob";
import GpuServerDetailJobTable from "../GpuServerDetailJobTable/GpuServerDetailJobTable";
import { cardStyle } from "../../../styles";

export const StyledGpuServerDetail = styled.section`
  width: 100%;

  display: grid;
  grid-template-areas:
    "summary"
    "current-job";

  grid-template-columns: 1fr;
  column-gap: 1rem;
  row-gap: 2rem;

  ${up("tablet")} {
    grid-template-areas: "summary current-job";
    grid-template-columns: 1fr 1fr;
  }

  ${up("laptop")} {
    grid-template-areas:
      "summary         current-job"
      "waiting-job     waiting-job";
  }
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
  display: none;
  grid-area: waiting-job;

  ${up("laptop")} {
    display: inherit;
  }
`;
