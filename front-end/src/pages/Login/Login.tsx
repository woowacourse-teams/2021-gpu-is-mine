import { useEffect } from "react";
import { Text } from "../../components";
import { MemberLayout } from "../../features/member";
import { checkAuthorization } from "../../features/member/authSlice";
import { useAppDispatch } from "../../app/hooks";
import { usePathTitle } from "../../hooks";
import { Container, Paragraph, StyledMemberLoginForm } from "./Login.styled";

const useAutoLogin = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuthorization());
  }, [dispatch]);
};

const Login = () => {
  const heading = usePathTitle();

  useAutoLogin();

  return (
    <MemberLayout>
      <Text as="h2" srOnly>
        {heading}
      </Text>
      <Container>
        <Paragraph>
          <Text as="span" size="xl" weight="medium">
            딥러닝 학습 자동화
          </Text>
          <Text as="span" size="xl" weight="medium">
            GPU 사용 극대화
          </Text>
        </Paragraph>

        <StyledMemberLoginForm />
      </Container>
    </MemberLayout>
  );
};

export default Login;
