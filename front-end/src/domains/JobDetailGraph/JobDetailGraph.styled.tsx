import styled from "styled-components";
import { cardStyle } from "../../styles";

export const StyledJobDetailGraph = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
  position: relative;

  ${cardStyle}
`;

export const Graph = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--primary-400);
`;
