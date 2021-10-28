import { up } from "styled-breakpoints";
import styled from "styled-components";
import { Text } from "../../../components";

export const StyledItem = styled.div`
  display: grid;
  grid-template-columns: 1.125fr 1fr 1fr 1fr;
  width: 100%;
  column-gap: 0.5rem;
  border-bottom: 2px solid var(--primary-50);
  background-color: inherit;
`;

export const Column = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;

  column-gap: 0.25rem;
  color: var(--on-primary-400);

  ${up("tablet")} {
    flex-direction: row;
    align-items: center;
  }
`;

export const ServerColumn = styled(Column)`
  flex-direction: row;
  align-items: center;
`;

export const ColumnTitle = styled(Text)`
  color: var(--primary-400);
`;
