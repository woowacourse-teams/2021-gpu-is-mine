import styled from "styled-components";

export const StyledLabel = styled.label`
  display: flex;
  align-items: center;

  &:hover {
    cursor: pointer;
  }

  & + & {
    margin-top: 0.75rem;
  }

  .input {
    display: none;
  }

  .input:checked + .radio-button::after {
    content: "✔";
    color: var(--on-primary-100);
    font-size: 1.25rem;
  }

  .input:checked + .radio-button {
    background-color: var(--primary-100);
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

  .content {
    width: 100%;
    margin-left: 0.75rem;
  }
`;
