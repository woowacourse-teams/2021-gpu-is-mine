import styled from "styled-components";

export const StyledLabel = styled.label`
  display: flex;
  align-items: center;
  column-gap: 0.75rem;

  &:hover {
    cursor: pointer;
  }

  .input {
    display: none;
  }

  .radio-button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1.5rem;
    height: 1.5rem;
    border: 2px solid var(--primary-100);
    border-radius: 0.5rem;
  }

  .input:checked + .radio-button {
    background-color: var(--primary-100);
    color: var(--on-primary-100);
  }

  .input:checked + .radio-button::after {
    content: "✔";
    font-size: 1.25rem;
  }

  .content {
    width: 100%;
  }
`;
