import styled from "styled-components";

export const StyledJobInfoList = styled.ul`
  display: flex;
  align-items: center;
  flex-direction: column;
  row-gap: 0.75rem;
  width: 100%;
`;

export const Label = styled.label`
  align-self: flex-start;

  display: flex;
  align-items: center;
  column-gap: 0.5rem;

  margin-right: 2rem;
  user-select: none;

  input[type="checkbox"] {
    width: 1.25rem;
    height: 1.25rem;
  }
`;
