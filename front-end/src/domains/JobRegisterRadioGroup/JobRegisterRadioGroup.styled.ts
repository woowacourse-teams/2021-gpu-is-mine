import styled from "styled-components";
import { RadioGroup } from "../../components";

export const StyledRadioGroup = styled(RadioGroup)`
  .loading-container {
    position: relative;
  }

  .validation-message {
    color: var(--error);
  }
`;
