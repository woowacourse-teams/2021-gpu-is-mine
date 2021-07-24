import styled from "styled-components";
import { up } from "styled-breakpoints";

export const StyledInfoList = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;
  row-gap: 0.75rem;

  ${up("tablet")} {
    grid-column: 2 / 3;
    grid-row: 3 / 4;
  }
`;
