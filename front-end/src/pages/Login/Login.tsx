import { useEffect } from "react";
import { useAppSelector } from "../../app/hooks";
import { Alert, Loading, Text } from "../../components";
import { MemberLayout } from "../../features/member";
import { selectLoginStatus } from "../../features/member/memberSlice";
import { useBoolean } from "../../hooks";
import { Container, Paragraph, StyledMemberLoginForm } from "./Login.styled";

const Login = () => {
  const { isLoading, isFailed } = useAppSelector(selectLoginStatus);

  const [isOpenAlert, openAlert, closeAlert] = useBoolean(false);

  useEffect(() => {
    if (isFailed) {
      openAlert();
    }
  }, [isFailed, openAlert]);

  return (
    <>
      {isOpenAlert && <Alert onConfirm={closeAlert}>이메일 또는 비밀번호를 확인해주세요</Alert>}

      <MemberLayout>
        <Container>
          {isLoading && <Loading size="lg" />}
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
    </>
  );
};

export default Login;
