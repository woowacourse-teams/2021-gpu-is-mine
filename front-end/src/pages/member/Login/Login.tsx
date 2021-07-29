import { Text } from "../../../components";
import { MemberLayout } from "../../../domains/Member";
import { Container, Paragraph, StyledMemberLoginForm } from "./Login.styled";

const Login = () => (
  <MemberLayout>
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

export default Login;
