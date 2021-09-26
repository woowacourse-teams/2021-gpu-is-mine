import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth, useForm, getInputProps, getFormProps } from "../../hooks";
import { Alert, Input, Text, Loading } from "../../components";
import { StyledForm, SubmitButton } from "./MemberLoginForm.styled";
import { PATH } from "../../constants";

interface MemberLoginFormProps {
  className?: string;
}

type Values = {
  email: string;
  password: string;
};

const MemberLoginForm = ({ className }: MemberLoginFormProps) => {
  const { login, isLoading, isFailed, done } = useAuth();

  useEffect(() => done, [done]);

  const { state, dispatch } = useForm<Values>({ email: "", password: "" });

  const handleSubmit = ({ email, password }: Values) => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    login({ email, password });
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
      {isFailed && <Alert onConfirm={done}>이메일 또는 비밀번호를 확인해주세요</Alert>}
      <Input size="sm" {...emailInputProps} autoComplete="email" placeholder="example@gamil.com" />
      <Input size="sm" {...passwordInputProps} autoComplete="current-password" type="password" />
      <SubmitButton color="secondary" disabled={isLoading}>
        로그인
      </SubmitButton>
      <Link to={PATH.MEMBER.SIGNUP}>
        <Text size="sm" className="signup">
          아직 회원이 아니신가요?
        </Text>
      </Link>
    </StyledForm>
  );
};

export default MemberLoginForm;
