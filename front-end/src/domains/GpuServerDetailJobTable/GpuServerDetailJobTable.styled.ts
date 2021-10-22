import styled from "styled-components";
import { cardStyle } from "../../styles";

export const StyledGpuServerDetailJobTable = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  height: 100%;

  ${cardStyle}
`;

export const EmptyJobContainer = styled.div`
  margin: auto;
`;
