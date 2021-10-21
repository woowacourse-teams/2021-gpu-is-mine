import styled from "styled-components";
import { up } from "styled-breakpoints";
import { Button } from "../../components";

export const StyledForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
  box-shadow: 2px 2px 10px 2px rgb(200 200 200 / 50%);

  background-color: white;
  padding: 1rem;
  border-radius: 1rem;

  ${up("tablet")} {
    max-width: 40rem;
    padding: 2rem;
    margin: auto;
  }

  .submit {
    width: 15%;
    align-self: flex-end;
    margin-top: 0.75rem;
    height: 2.5rem;
    font-size: 1.125rem;

    &:hover {
      filter: brightness(1.1);
    }
  }
`;

export const DockerHubImageSection = styled.div`
  display: flex;
  align-items: center;
  column-gap: 0.5rem;
  justify-content: center;

  & input::-webkit-calendar-picker-indicator {
    transform: translateY(-3px);
  }
`;

export const ToolTipContainer = styled.div`
  position: relative;
`;

export const ToolTipBox = styled.span`
  position: absolute;
  background-color: var(--secondary-50);
  padding: 0.5rem;
  box-shadow: 2px 2px 4px 2px var(--secondary-100);
  border-radius: 0.25rem;
  top: 0;
  left: 50%;
  transform: translateX(-50%) translateY(-100%);
  width: 14rem;
`;

export const SampleImageButton = styled(Button)`
  background-color: var(--primary-500);
  color: var(--on-primary-500);
  width: 6rem;

  &:focus {
    box-shadow: 0 0 0 2px var(--primary-700);
  }

  &:active {
    box-shadow: 0 0 0 4px var(--primary-700);
    filter: brightness(1.1);
  }
`;
