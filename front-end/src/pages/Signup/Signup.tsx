import { Dialog, Loading, Text } from "../../components";
import { PATH } from "../../constants";
import { MemberLayout } from "../../features/member";
import { selectSignupStatus, resetAction } from "../../features/member/signupSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useMoveToPage, usePathTitle } from "../../hooks";
import { StyledSignupForm } from "./Signup.styled";

const Signup = () => {
  const { isLoading, isSucceed, isSettled } = useAppSelector(selectSignupStatus);

  const heading = usePathTitle();

  const dispatch = useAppDispatch();

  const handleClose = () => dispatch(resetAction());

  const moveToLoginPage = useMoveToPage(PATH.MEMBER.LOGIN);

  const handleSucceedConfirm = () => {
    dispatch(resetAction());
    moveToLoginPage();
  };

  const DialogText = isSucceed ? "회원가입에 성공하였습니다." : "회원가입에 실패하였습니다.";

  return (
    <MemberLayout>
      {isLoading && <Loading size="lg" />}

      <Dialog
        open={isSettled}
        onClose={handleClose}
        onCancel={handleClose}
        onConfirm={handleSucceedConfirm}
      >
        <Text size="sm" weight="medium">
          {DialogText}
        </Text>
      </Dialog>

      <Text as="h2" srOnly>
        {heading}
      </Text>
      <StyledSignupForm />
    </MemberLayout>
  );
};

export default Signup;
