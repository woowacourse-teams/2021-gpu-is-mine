import { useEffect } from "react";
import { Dialog, Loading, Text } from "../../components";
import { MemberLayout } from "../../features/member";
import { checkAuthorization, selectLoginStatus } from "../../features/member/authSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useBoolean, usePathTitle } from "../../hooks";
import { Container, Paragraph, StyledMemberLoginForm } from "./Login.styled";

const useAutoLogin = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuthorization());
  }, [dispatch]);
};

const Login = () => {
  const { isLoading, isFailed } = useAppSelector(selectLoginStatus);

  const [isOpenDialog, openDialog, closeDialog] = useBoolean(false);

  useEffect(() => {
    if (isFailed) {
      openDialog();
    }
  }, [isFailed, openDialog]);

  const heading = usePathTitle();

  useAutoLogin();

  return (
    <>
      <Dialog open={isOpenDialog} onClose={closeDialog} onConfirm={closeDialog}>
        <Text size="sm" weight="medium">
          이메일 또는 비밀번호를 확인해주세요
        </Text>
      </Dialog>

      <MemberLayout>
        <Text as="h2" srOnly>
          {heading}
        </Text>
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
