import styled from "styled-components";
import { up } from "styled-breakpoints";
import { Text } from "../../components";

export const StyledHeader = styled.header`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--primary-900);
  color: var(--on-primary-900);
  padding: 0.5rem 1rem 0.5rem 0.5rem;

  flex-direction: column;

  ${up("tablet")} {
    flex-direction: row;
  }

  ${up("laptop")} {
    padding: 0.5rem 2.5rem 0.5rem 1.5rem;
  }
`;

export const StyledLabName = styled(Text)`
  ${up("laptop")} {
    display: none;
  }
`;
