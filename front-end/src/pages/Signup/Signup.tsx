import { useEffect } from "react";
import { Dialog, Loading, Text } from "../../components";
import { PATH } from "../../constants";
import { MemberLayout } from "../../features/member";
import { selectSignupStatus } from "../../features/member/signupSlice";
import { useAppSelector } from "../../app/hooks";
import { useBoolean, useMoveToPage, usePathTitle } from "../../hooks";
import { StyledSignupForm } from "./Signup.styled";

const Signup = () => {
  const { isLoading, isSucceed, isFailed } = useAppSelector(selectSignupStatus);

  const [isOpenDialog, openDialog, closeDialog] = useBoolean(false);

  const heading = usePathTitle();

  const moveToLoginPage = useMoveToPage(PATH.MEMBER.LOGIN);

  const onConfirm = isSucceed ? moveToLoginPage : closeDialog;

  const DialogText = isSucceed ? "회원가입에 성공하였습니다." : "회원가입에 실패하였습니다.";

  useEffect(() => {
    if (isSucceed || isFailed) {
      openDialog();
    }
  }, [isSucceed, isFailed, openDialog]);

  return (
    <MemberLayout>
      {isLoading && <Loading size="lg" />}

      <Dialog open={isOpenDialog} onClose={closeDialog} onConfirm={onConfirm}>
        <Text>{DialogText}</Text>
      </Dialog>

      <Text as="h2" srOnly>
        {heading}
      </Text>
      <StyledSignupForm />
    </MemberLayout>
  );
};

export default Signup;
