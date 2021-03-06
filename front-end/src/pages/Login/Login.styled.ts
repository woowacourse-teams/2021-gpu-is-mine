import styled from "styled-components";
import { MemberLoginForm } from "../../features/member";

export const Container = styled.div`
  margin: auto;
  width: 100%;
  position: relative;
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
  background-color: var(--background);
  color: var(--on-background);
`;
