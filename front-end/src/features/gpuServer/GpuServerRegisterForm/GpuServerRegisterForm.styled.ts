import styled from "styled-components";
import { Button } from "../../../components";

export const StyledForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
  box-shadow: 2px 2px 10px 2px rgb(200 200 200 / 50%);
`;

export const StyledButton = styled(Button)`
  width: 15%;
  min-width: 5rem;
  align-self: flex-end;
  margin-top: 0.75rem;
  height: 2.5rem;
  font-size: 1.125rem;

  &:hover {
    filter: brightness(1.1);
  }
`;
