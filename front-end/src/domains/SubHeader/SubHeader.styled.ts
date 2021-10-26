import styled from "styled-components";
import { up } from "styled-breakpoints";

export const StyledSubHeader = styled.header`
  background-color: var(--primary-700);
  color: var(--on-primary-700);

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0.5rem 1rem;

  ${up("tablet")} {
    height: 100%;
  }

  .title {
    display: flex;
    column-gap: 0.75rem;
    flex-shrink: 0;
  }

  .title__name {
    transition: all 0.1s ease-in-out;
  }

  .title__name:hover {
    color: var(--secondary-600);
  }

  .lab-name {
    display: none;

    ${up("tablet")} {
      display: inherit;
    }
  }
`;
