import styled from "styled-components";
import { up } from "styled-breakpoints";
import JobDetailSummary from "../JobDetailSummary/JobDetailSummary";
import JobDetailGraph from "../JobDetailGraph/JobDetailGraph";
import JobDetailLog from "../JobDetailLog/JobDetailLog";

export const StyledJobDetail = styled.section`
  width: 100%;

  display: grid;

  grid-template-areas:
    "summary"
    "graph"
    "log";

  grid-template-columns: 1fr;

  column-gap: 1rem;
  row-gap: 2rem;

  ${up("laptop")} {
    grid-template-areas:
      "summary   graph"
      "log       log  ";

    grid-template-columns: minmax(auto, 25rem) 1fr;
    grid-template-rows: max-content;
  }

  ${up("desktop")} {
    grid-template-columns: 1fr 1fr;
  }
`;

export const StyledJobDetailSummary = styled(JobDetailSummary)`
  grid-area: summary;
`;

export const StyledJobDetailGraph = styled(JobDetailGraph)`
  grid-area: graph;

  overflow-x: hidden;
  height: max-content;
  min-height: max-content;

  ${up("laptop")} {
    height: unset;
  }
`;

export const StyledJobDetailLog = styled(JobDetailLog)`
  grid-area: log;
`;
