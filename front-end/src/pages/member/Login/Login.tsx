import { Text } from "../../../components";
import { MemberLoginForm, MemberLayout } from "../../../domains/Member";
import { Container, Paragraph } from "./Login.styled";

const Login = () => (
  <MemberLayout>
    <Container>
      <Paragraph>
        <Text size="xl" weight="medium">
          딥러닝 학습 자동화
        </Text>
        <Text size="xl" weight="medium">
          GPU 사용 극대화
        </Text>
      </Paragraph>
      <MemberLoginForm />
    </Container>
  </MemberLayout>
);

export default Login;
