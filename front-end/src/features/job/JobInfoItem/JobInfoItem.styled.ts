import styled from "styled-components";
import { textEllipsis } from "../../../styles/common";

export const StyledJobInfoItem = styled.li`
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) 4fr auto;
  align-items: center;
  width: 100%;
  border-bottom: 2px solid var(--primary-200);
  border-radius: 0.5rem;
  row-gap: 1rem;
  column-gap: 1rem;
  padding: 0.75rem 1.25rem;
  box-shadow: 0px 3px 5px 1px #e9eefa;
  background-color: #fff;

  .job-info-title-wrapper {
    display: flex;
    align-items: center;
    column-gap: 1rem;
    overflow: hidden;
    word-break: break-all;
  }

  .job-info-title-wrapper__status {
    flex-shrink: 0;
  }

  .job-info-details-wrapper {
    display: grid;
    column-gap: 0.75rem;
    grid-template-columns: minmax(0, 1fr) 1.5fr 1.5fr minmax(0, 1fr);
  }

  .job-info-button-wrapper {
    display: flex;
    column-gap: 0.25rem;
  }

  .job-info-details-wrapper__text {
    ${textEllipsis}
  }

  .job-info-button-wrapper__button {
    width: 4rem;
    height: 2rem;
    font-size: 1rem;
    font-weight: bold;
    padding: 0.25rem 1rem;
    box-shadow: 0px 4px 4px 0px #00000040;
    border-radius: 2rem;
  }

  .job-info-button-wrapper__button:hover {
    filter: brightness(1.1);
  }

  .job-info-title-wrapper__status + p {
    white-space: pre;
  }
`;
