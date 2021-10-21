import styled from "styled-components";
import { Button } from "../../components";
import { cardStyle } from "../../styles";

export const StyledJobDetailLog = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1.25rem;

  ${cardStyle}
`;

export const LogConsole = styled.div`
  width: 100%;
  height: 100%;
  max-height: 30rem;
  padding: 1.5rem 2rem;
  background-color: var(--primary-900);
  color: var(--on-primary-900);
  border-radius: 0.5rem;
  overflow-y: auto;
`;

export const LogHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const LogRefreshPanel = styled.div`
  display: flex;
  align-items: center;
  column-gap: 1.5rem;
`;

export const RefreshButton = styled(Button)`
  position: relative;
  width: fit-content;
`;
