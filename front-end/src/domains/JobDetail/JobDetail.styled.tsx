import styled from "styled-components";
import JobDetailSummary from "../JobDetailSummary/JobDetailSummary";
import JobDetailGraph from "../JobDetailGraph/JobDetailGraph";
import JobDetailLog from "../JobDetailLog/JobDetailLog";

export const StyledJobDetail = styled.section`
  width: 100%;

  display: grid;
  grid-template-areas:
    "summary   graph"
    "log       log  ";

  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: max-content;
  column-gap: 1rem;
  row-gap: 2rem;
`;

export const StyledJobDetailSummary = styled(JobDetailSummary)`
  grid-area: summary;
`;

export const StyledJobDetailGraph = styled(JobDetailGraph)`
  grid-area: graph;
`;

export const StyledJobDetailLog = styled(JobDetailLog)`
  grid-area: log;
`;
