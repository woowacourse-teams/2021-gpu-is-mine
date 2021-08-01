import styled from "styled-components";

export const StyledJobDetailLog = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
`;

export const LogConsole = styled.div`
  width: 100%;
  max-height: 30rem;
  padding: 1.5rem 2rem;
  background-color: var(--primary-900);
  color: var(--on-primary-900);
  border-radius: 0.5rem;
  overflow-y: auto;
`;
