import styled from "styled-components";

export const Label = styled.label`
  &.sm :not(:first-child) {
    margin-top: 0.25rem;
  }

  &.md :not(:first-child) {
    margin-top: 0.5rem;
  }

  &.lg :not(:first-child) {
    margin-top: 0.75rem;
  }

  .input {
    width: 100%;
    border-style: solid;
    border-radius: 0.5rem;
  }

  .input:focus {
    outline: none;
  }

  &.sm .input {
    padding: 0.25rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5rem;
    border-width: 2px;
  }

  &.md .input {
    padding: 0.5rem 0.75rem;
    font-size: 1.25rem;
    line-height: 1.75rem;
    border-width: 2px;
  }

  &.lg .input {
    padding: 0.5rem 1rem;
    font-size: 1.875rem;
    line-height: 2.25rem;
    border-width: 3px;
  }

  &.valid .input {
    border-color: var(--primary-700);
  }

  &.valid .input:focus {
    border-color: var(--secondary-400);
  }

  :not(&.valid) .input {
    border-color: var(--error);
  }

  .validation-message {
    color: var(--error);
    margin-left: 0.5rem;
  }

  &.sm .validation-message {
    min-height: 1rem;
  }

  &.md .validation-message {
    min-height: 1.25rem;
  }

  &.lg .validation-message {
    min-height: 1.875rem;
  }
`;
