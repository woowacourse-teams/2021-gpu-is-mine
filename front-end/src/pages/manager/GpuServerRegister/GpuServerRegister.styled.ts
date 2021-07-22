import styled from "styled-components";
import { only, up } from "styled-breakpoints";

export const Container = styled.div`
  height: 100%;

  display: grid;
  grid-template: auto auto auto 1fr auto / 1fr;

  ${up("tablet")} {
    grid-template: auto 1fr auto / auto 1fr;
  }

  .header {
    grid-row: 1 / 2;
  }

  .sub-header {
    grid-row: 2 / 3;

    > * {
      height: 100%;
    }

    ${up("tablet")} {
      grid-row: 1 / 2;
      grid-column: 2 / 4;
    }
  }

  .nav {
    display: none;

    ${only("mobile")} {
      &.nav--visible {
        display: inherit;
        grid-row: 3 / 4;
      }
    }

    ${up("tablet")} {
      display: inherit;

      grid-column: 1 / 2;
      grid-row: 2 / 4;
    }
  }

  .content {
    grid-row: 4 / 5;
    overflow-y: auto;
    padding: 1rem;
    background-color: var(--primary-50);

    ${up("tablet")} {
      grid-column: 2 / 3;
      grid-row: 2 / 3;
      display: flex;
    }
  }

  .register-form {
    background-color: white;
    padding: 1rem;
    border-radius: 1rem;

    ${up("tablet")} {
      max-width: 40rem;
      padding: 2rem;
      margin: auto;
    }
  }

  .footer {
    grid-row: 5 / 6;
    background-color: var(--primary-50);
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    ${up("tablet")} {
      grid-column: 2 / 3;
      grid-row: 3 / 4;
    }
  }
`;
