import { Alert, Loading, Text } from "../../components";
import { PATH } from "../../constants";
import { MemberLayout } from "../../features/member";
import { selectSignupStatus, signupUserConfirmed } from "../../features/member/signupSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useMoveToPage, usePathTitle } from "../../hooks";
import { StyledSignupForm } from "./Signup.styled";

const Signup = () => {
  const { isLoading, isSucceed, isFailed } = useAppSelector(selectSignupStatus);

  const heading = usePathTitle();

  const dispatch = useAppDispatch();

  const handleFailedConfirm = () => {
    dispatch(signupUserConfirmed());
  };

  const moveToLoginPage = useMoveToPage(PATH.MEMBER.LOGIN);

  const handleSucceedConfirm = () => {
    dispatch(signupUserConfirmed());
    moveToLoginPage();
  };

  return (
    <MemberLayout>
      {isLoading && <Loading size="lg" />}

      {isSucceed && (
        <Alert onConfirm={handleSucceedConfirm}>
          <Text>회원가입에 성공하였습니다.</Text>
        </Alert>
      )}

      {isFailed && (
        <Alert onConfirm={handleFailedConfirm}>
          <Text>회원가입에 실패하였습니다.</Text>
        </Alert>
      )}

      <Text as="h2" srOnly>
        {heading}
      </Text>
      <StyledSignupForm />
    </MemberLayout>
  );
};

export default Signup;
