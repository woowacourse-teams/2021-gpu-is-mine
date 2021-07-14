import styled from "styled-components";
import { breakpoint } from "../../../styles/breakpoint";

export const Container = styled.div`
  height: 100%;

  display: grid;
  grid-template: auto auto auto 1fr auto / 1fr;

  ${breakpoint("tablet")`
    grid-template: auto 1fr auto / auto 1fr;
  `}

  .header {
    grid-row: 1 / 2;
  }

  .sub-header {
    grid-row: 2 / 3;

    > * {
      height: 100%;
    }

    ${breakpoint("tablet")`
      grid-row: 1 / 2;
      grid-column: 2 / 4;
    `}
  }

  .nav {
    display: none;

    &.nav--visible {
      display: inherit;
      grid-row: 3 / 4;
    }

    ${breakpoint("tablet")`
      &,
      &.nav--visible {
        display: inherit;

        grid-column: 1 / 2;
        grid-row: 2 / 4;
      }
    `}
  }

  .content {
    grid-row: 4 / 5;
    overflow-y: auto;
    padding: 1rem;

    ${breakpoint("tablet")`
      grid-column: 2 / 3;
      grid-row: 2 / 3;
    `}
  }

  .footer {
    grid-row: 5 / 6;
    justify-self: center;

    ${breakpoint("tablet")`
      grid-column: 2 / 3;
      grid-row: 3 / 4;
    `}
  }
`;
