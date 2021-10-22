import styled from "styled-components";
import { cardStyle } from "../../styles";

export const ServerNameBox = styled.div`
  display: flex;
  align-items: center;
  column-gap: 0.75rem;
`;

export const StyledGpuServerDetailSummary = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.75rem;

  ${cardStyle}
`;

export const SummaryList = styled.dl`
  display: flex;
  flex-direction: column;
  row-gap: 0.75rem;
`;
