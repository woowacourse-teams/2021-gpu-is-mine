import styled from "styled-components";
import { up } from "styled-breakpoints";
import { VerticalBox } from "../../components";

export const StyledGpuServerInfoItem = styled(VerticalBox)`
  min-width: 340px;
  border: 2px solid var(--primary-200);
  border-radius: 0.5rem;
  row-gap: 1.5rem;
  padding: 0.8rem 1rem;
  box-shadow: 0px 3px 5px 1px #e9eefa;

  ${up("tablet")} {
    max-width: 1200px;
    flex-direction: row;
    align-items: center;
    padding: 1rem 1.5rem;
    border: none;
    border-bottom: 2px solid var(--primary-200);
  }

  .gpu-server-title-wrapper {
    display: flex;
    align-items: center;
    position: relative;

    svg {
      margin-right: 1rem;
    }

    div {
      position: absolute;
      right: 0;
    }

    ${up("tablet")} {
      min-width: 12rem;
      margin-right: 1rem;

      svg {
        display: none;
      }

      p {
        margin-left: 2.5rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      div {
        position: absolute;
        left: 0;
      }
    }
  }

  .gpu-server-details {
    display: flex;
    width: 100%;
    row-gap: 1rem;

    ${up("tablet")} {
      flex-direction: row;
      column-gap: 7rem;
    }
  }

  .button-wrapper {
    display: none;

    ${up("tablet")} {
      display: flex;
      flex-direction: row;

      button {
        width: 4.8rem;
        height: 2rem;
        font-size: 1rem;
        font-weight: bold;
        padding: 0.2rem 1rem;
        box-shadow: 0px 4px 4px 0px #00000040;
        border-radius: 2rem;

        &:last-child {
          margin-left: 0.8rem;
        }
      }
    }
  }
`;

export const ServerOffMark = styled.div`
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  opacity: 80%;
  background-color: #c4c4c4;
`;
