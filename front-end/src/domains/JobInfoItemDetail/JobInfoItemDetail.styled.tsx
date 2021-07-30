import styled from "styled-components";

export const StyledJobInfoItemDetail = styled.section`
  width: 100%;

  display: grid;
  grid-template-areas:
    "summary   graph"
    "log       log  ";

  grid-template-columns: repeat(2, 1fr);
  column-gap: 1rem;
  row-gap: 2rem;
`;

export const JobSummaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.75rem;
  grid-area: summary;
`;

export const GraphContainer = styled.div`
  grid-area: graph;

  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
`;

export const Graph = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--primary-400);
`;

export const LogContainer = styled.div`
  grid-area: log;

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

export const Anchor = styled.a`
  text-decoration: underline;

  /* TODO: 색깔 수정 */
  &:hover {
    color: var(--secondary-600);
  }

  &:visited {
    color: var(--secondary-900);
  }

  &:hover:visited {
    color: var(--secondary-300);
  }
`;
