import { Dialog, Loading, Text } from "../../components";
import { PATH } from "../../constants";
import { MemberLayout } from "../../features/member";
import {
  selectSignupStatus,
  signupErrorConfirmed,
  signupSucceedConfirmed,
} from "../../features/member/signupSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useMoveToPage, usePathTitle } from "../../hooks";
import { StyledSignupForm } from "./Signup.styled";

const Signup = () => {
  const { isLoading, isSucceed, isFailed } = useAppSelector(selectSignupStatus);

  const heading = usePathTitle();

  const dispatch = useAppDispatch();

  const handleFailedConfirm = () => {
    dispatch(signupErrorConfirmed());
  };

  const moveToLoginPage = useMoveToPage(PATH.MEMBER.LOGIN);

  const handleSucceedConfirm = () => {
    dispatch(signupSucceedConfirmed());
    moveToLoginPage();
  };

  return (
    <MemberLayout>
      {isLoading && <Loading size="lg" />}

      <Dialog
        open={isSucceed}
        onClose={() => dispatch(signupSucceedConfirmed())}
        onConfirm={handleSucceedConfirm}
      >
        <Text size="sm" weight="medium">
          회원가입에 성공하였습니다.
        </Text>
      </Dialog>

      <Dialog open={isFailed} onClose={handleFailedConfirm} onConfirm={handleFailedConfirm}>
        <Text size="sm" weight="medium">
          회원가입에 실패하였습니다.
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
