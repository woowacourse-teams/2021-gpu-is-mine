import styled from "styled-components";
import { breakpoint } from "../../styles/breakpoint";

export const StyledManagerHeader = styled.header`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--primary-900);
  color: var(--on-primary-900);
  padding: 0.5rem 1rem 0.5rem 0.5rem;

  ${breakpoint("tablet")`
      grid-column: 1 / 2;
      grid-row: 1 / 2;
      padding: 0.5rem 2.5rem 0.5rem 1.5rem;
    `}

  .lab-name {
    ${breakpoint("tablet")`
        display: none;
    `}
  }
`;
