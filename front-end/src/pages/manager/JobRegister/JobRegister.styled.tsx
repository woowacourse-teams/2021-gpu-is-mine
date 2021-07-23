import styled from "styled-components";
import { up } from "styled-breakpoints";
import { JobRegisterForm } from "../../../domains/Job";

export const StyledRegisterForm = styled(JobRegisterForm)`
  background-color: white;
  padding: 1rem;
  border-radius: 1rem;

  ${up("tablet")} {
    max-width: 40rem;
    padding: 2rem;
    margin: auto;
  }
`;
