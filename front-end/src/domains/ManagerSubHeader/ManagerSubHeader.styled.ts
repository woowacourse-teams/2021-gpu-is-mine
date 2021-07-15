import styled from "styled-components";
import { up } from "styled-breakpoints";

export const StyledManagerSubHeader = styled.header`
  background-color: var(--primary-700);
  color: var(--on-primary-700);

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0.5rem 1rem;

  .lab-name {
    display: none;

    ${up("tablet")} {
      display: inherit;
    }
  }

  .down-arrow {
    display: inherit;

    ${up("tablet")} {
      display: none;
    }
  }
`;
