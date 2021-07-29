import styled from "styled-components";
import { up } from "styled-breakpoints";
import { Button } from "../../components";

export const StyledForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
  box-shadow: 2px 2px 10px 2px rgb(200 200 200 / 50%);

  background-color: white;
  padding: 1rem;
  border-radius: 1rem;

  ${up("tablet")} {
    max-width: 40rem;
    padding: 2rem;
    margin: auto;
  }

  .signup-form__login {
    margin-top: 0.5rem;
    color: var(--primary-800);
    text-align: center;
  }

  .signup-form__login:hover {
    text-decoration: underline;
  }
`;

export const SubmitButton = styled(Button)`
  width: 100%;
  align-self: flex-end;
  margin-top: 0.75rem;
  height: 2.5rem;
  font-size: 1.125rem;

  &:hover {
    filter: brightness(1.1);
  }
`;
