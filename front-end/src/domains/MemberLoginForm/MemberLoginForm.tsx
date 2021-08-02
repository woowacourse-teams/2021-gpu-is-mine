import { Link } from "react-router-dom";
import { isEmail } from "../../utils";
import { useBoolean, useAuth } from "../../hooks";
import useFormNew, { getInputProps, getFormProps } from "../../hooks/useFormNew/useFormNew";
import { Alert, Input, Text, Loading } from "../../components";
import { StyledForm, SubmitButton } from "./MemberLoginForm.styled";
import { PATH } from "../../constants";
import { passwordValidator } from "../MemberSignupForm/validator";

interface MemberLoginFormProps {
  className?: string;
}

type Values = {
  email: string;
  password: string;
};

const MemberLoginForm = ({ className }: MemberLoginFormProps) => {
  const [isAlertOpen, openAlert, closeAlert] = useBoolean(false);
  const { login, isLoading } = useAuth();

  const { state, dispatch } = useFormNew<Values>({
    email: "",
    password: "",
  });

  const handleSubmit = ({ email, password }: Values) => {
    const isValid = isEmail(String(email)) && passwordValidator(String(password)) === "";

    if (!isValid) {
      openAlert();
      return;
    }

    login({ email, password }).catch(openAlert);
  };

  const formProps = getFormProps({ state, dispatch, handleSubmit });

  const emailInputProps = getInputProps({
    state,
    dispatch,
    label: "이메일",
    name: "email",
  });

  const passwordInputProps = getInputProps({
    state,
    dispatch,
    label: "비밀번호",
    name: "password",
  });

  return (
    <StyledForm {...formProps} aria-label="로그인" className={className}>
      {isLoading && <Loading size="lg" />}
      <Alert isOpen={isAlertOpen} close={closeAlert}>
        이메일 또는 비밀번호를 확인해주세요
      </Alert>
      <Input size="sm" {...emailInputProps} autoComplete="email" placeholder="example@gamil.com" />
      <Input size="sm" {...passwordInputProps} autoComplete="current-password" type="password" />
      <SubmitButton color="secondary">로그인</SubmitButton>
      <Link to={PATH.MEMBER.SIGNUP}>
        <Text size="sm" className="signup">
          아직 회원이 아니신가요?
        </Text>
      </Link>
    </StyledForm>
  );
};

export default MemberLoginForm;
