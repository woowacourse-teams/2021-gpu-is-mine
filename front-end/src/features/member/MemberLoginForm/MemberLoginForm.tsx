import { useRef } from "react";
import { Link } from "react-router-dom";
import { useForm, getInputProps, getFormProps } from "../../../hooks";
import { Input, Loading, Text, useToast } from "../../../components";
import { StyledForm, SubmitButton } from "./MemberLoginForm.styled";
import { PATH } from "../../../constants";
import { login, selectLoginStatus } from "../authSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";

interface MemberLoginFormProps {
  className?: string;
}

type Values = {
  email: string;
  password: string;
};

const MemberLoginForm = ({ className }: MemberLoginFormProps) => {
  const { isLoading } = useAppSelector(selectLoginStatus);

  const emailInputRef = useRef<HTMLInputElement | null>(null);

  const appDispatch = useAppDispatch();

  const showToast = useToast();

  const handleSubmit = async ({ email, password }: Values) => {
    try {
      await appDispatch(login({ email, password })).unwrap();
    } catch (error) {
      showToast({
        title: `Login Failed`,
        message: "이메일 또는 비밀번호를 확인해주세요",
        type: "error",
      });

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      emailInputRef.current!.focus();
    }
  };

  const { state, dispatch } = useForm<Values>({ email: "", password: "" });

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
      <Input
        size="sm"
        {...emailInputProps}
        autoComplete="email"
        placeholder="example@email.com"
        ref={emailInputRef}
      />
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
