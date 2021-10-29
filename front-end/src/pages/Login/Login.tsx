import { Text } from "../../components";
import { MemberLayout } from "../../features/member";
import { useAuthorize, useBreakpoints, usePathTitle } from "../../hooks";
import { Container, Paragraph, StyledMemberLoginForm } from "./Login.styled";

const Login = () => {
  const heading = usePathTitle();

  const { isMobile } = useBreakpoints();

  const paragraphSize = isMobile ? "lg" : "xl";

  useAuthorize();

  return (
    <MemberLayout>
      <Text as="h2" srOnly>
        {heading}
      </Text>
      <Container>
        <Paragraph>
          <Text as="span" size={paragraphSize} weight="medium">
            딥러닝 학습 자동화
          </Text>
          <Text as="span" size={paragraphSize} weight="medium">
            GPU 사용 극대화
          </Text>
        </Paragraph>

        <StyledMemberLoginForm />
      </Container>
    </MemberLayout>
  );
};

export default Login;
