import styled from "styled-components";
import { breakpoint } from "../../styles/breakpoint";

export const StyledManagerHeader = styled.header`
  background-color: var(--primary-700);
  color: var(--on-primary-700);

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0.5rem 1rem;

  .lab-name {
    display: none;

    ${breakpoint("tablet")`
        display: inherit;
      `}
  }

  .down-arrow {
    display: inherit;

    ${breakpoint("tablet")`
        display: none;
      `}
  }
`;
