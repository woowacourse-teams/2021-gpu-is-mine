import styled from "styled-components";
import { up } from "styled-breakpoints";
import { GpuServerRegisterForm } from "../../../domains/GpuServer";

export const StyledRegisterForm = styled(GpuServerRegisterForm)`
  background-color: white;
  padding: 1rem;
  border-radius: 1rem;

  ${up("tablet")} {
    max-width: 40rem;
    padding: 2rem;
    margin: auto;
  }
`;
