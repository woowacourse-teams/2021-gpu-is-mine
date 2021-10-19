import styled from "styled-components";
import Button from "../Button/Button";

export const StyledToast = styled.div`
  border: 1px solid aquamarine;
  display: flex;
  align-items: center;
  column-gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  width: 40rem;
`;

export const Body = styled.div`
  width: 100%;
`;

export const CloseButton = styled(Button)`
  width: 2rem;
  height: 2rem;
  border: 2px solid red;
  align-self: flex-start;
`;
