import styled from "styled-components";

export const ConfirmWrapper = styled.div`
  display: grid;
  grid-template-rows: auto 3rem;
  box-shadow: 0 0 4px 2px rgb(253 243 226 / 30%);

  min-width: 18rem;
  max-width: 30rem;
  min-height: 12rem;

  color: var(--on-secondary-50);
  background-color: var(--secondary-50);
  border-radius: 1rem;

  .content-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;

    word-break: break-all;
    padding: 1rem 2rem;
  }

  .button-wrapper {
    display: flex;
    flex-direction: row;
  }

  .button {
    color: var(--on-secondary-50);
    font-size: 1.25rem;
    font-weight: bold;

    border-color: rgb(250 224 184 / 90%);
    border-top-width: 2px;
    border-style: solid;
    background-color: var(--secondary-50);
    border-radius: 0;
  }

  .button:hover {
    background-color: var(--secondary-300);
  }

  .button-wrapper__cancel {
    border-bottom-left-radius: 1rem;
    border-right-width: 2px;
  }

  .button-wrapper__confirm {
    border-bottom-right-radius: 1rem;
  }
`;
