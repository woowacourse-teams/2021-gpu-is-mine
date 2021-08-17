import styled from "styled-components";

export const StyledJobDetailSummary = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.75rem;
`;

export const Anchor = styled.a`
  color: var(--secondary-900);

  &:hover {
    color: var(--secondary-600);
    font-weight: 500;
    font-size: 97.8%;
  }
`;
