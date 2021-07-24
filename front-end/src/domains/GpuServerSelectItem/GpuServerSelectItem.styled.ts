import styled from "styled-components";

export const StyledItem = styled.div`
  display: grid;
  grid-template-columns: 1.125fr 1fr 1fr 1fr;
  width: 100%;
  column-gap: 0.5rem;
  border-bottom: 2px solid var(--primary-50);

  .column {
    display: flex;
    align-items: center;
    column-gap: 0.25rem;
    color: var(--on-primary-400);
  }

  .column__title {
    color: var(--primary-400);
  }
`;
