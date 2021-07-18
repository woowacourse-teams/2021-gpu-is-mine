import styled from "styled-components";
import { up } from "styled-breakpoints";
import { VerticalBox } from "../../components";

export const StyledGpuServerInfoItem = styled(VerticalBox)`
  width: 100%;
  border-bottom: 2px solid var(--primary-200);
  border-radius: 0.5rem;
  row-gap: 1.25rem;
  padding: 0.75rem 1rem;
  box-shadow: 0px 3px 5px 1px #e9eefa;
  background-color: white;

  ${up("laptop")} {
    display: grid;
    grid-template-columns: 20% 1fr auto;
    column-gap: 0.75rem;
    padding: 1rem 1.5rem;
  }

  .gpu-server-title-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;

    ${up("tablet")} {
      flex-direction: row-reverse;
      margin-right: auto;
    }
  }

  .gpu-server-icon {
    margin-right: 1rem;

    ${up("tablet")} {
      display: none;
    }
  }

  .status-mark {
    margin-left: auto;
    flex-shrink: 0;

    ${up("tablet")} {
      margin-right: 1rem;
    }
  }

  .gpu-server-details-wrapper {
    width: 100%;
    row-gap: 0.5rem;

    ${up("tablet")} {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      column-gap: 0.5rem;
    }
  }

  .button-wrapper {
    display: none;

    ${up("tablet")} {
      display: flex;
      flex-direction: row;
      column-gap: 0.5rem;
      justify-content: flex-end;
    }

    ${up("laptop")} {
      justify-content: flex-start;
    }
  }

  .button {
    width: 4.75rem;
    height: 2rem;
    font-size: 1rem;
    font-weight: bold;
    padding: 0.25rem 1rem;
    box-shadow: 0px 4px 4px 0px #00000040;
    border-radius: 2rem;
  }

  .button:hover {
    filter: brightness(1.5);
  }
`;

export const ServerOffMark = styled.div`
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  opacity: 80%;
  background-color: #c4c4c4;
`;
