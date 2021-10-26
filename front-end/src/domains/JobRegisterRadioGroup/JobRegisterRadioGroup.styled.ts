import styled from "styled-components";
import { RadioGroup } from "../../components";

export const StyledRadioGroup = styled(RadioGroup)`
  .loading-container {
    position: relative;
  }

  .job-register-radio-group__list {
    display: flex;
    flex-direction: column;
    row-gap: 0.75rem;
    max-height: 12rem;
    overflow-y: auto;
  }
`;
