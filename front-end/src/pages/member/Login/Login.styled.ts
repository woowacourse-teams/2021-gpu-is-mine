import styled from "styled-components";
import { MemberLoginForm } from "../../../domains/Member";

export const Container = styled.div`
  margin: auto;
  width: 100%;
`;

export const Paragraph = styled.p`
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

export const StyledMemberLoginForm = styled(MemberLoginForm)`
  margin-bottom: 10rem;
`;
