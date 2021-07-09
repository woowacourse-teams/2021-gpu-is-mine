import styled from "styled-components";
import { breakpoint } from "../../styles/breakpoint";

export const StyledHeader = styled.header`
  ${breakpoint("tablet")`
    display: flex;
    align-items: center;
  `}

  .title {
    display: flex;
    align-items: center;
    column-gap: 0.75rem;

    ${breakpoint("tablet")`
      margin-right: auto;
    `}
  }
`;
