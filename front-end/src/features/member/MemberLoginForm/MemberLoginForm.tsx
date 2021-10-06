import { Link } from "react-router-dom";
import { useForm, getInputProps, getFormProps } from "../../../hooks";
import { Input, Text } from "../../../components";
import { StyledForm, SubmitButton } from "./MemberLoginForm.styled";
import { PATH } from "../../../constants";
import { login, selectLoginStatus } from "../memberSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";

interface MemberLoginFormProps {
  className?: string;
}

type Values = {
  email: string;
  password: string;
};

const MemberLoginForm = ({ className }: MemberLoginFormProps) => {
  const appDispatch = useAppDispatch();

  const { isLoading } = useAppSelector(selectLoginStatus);

  const handleSubmit = ({ email, password }: Values) => {
    appDispatch(login({ email, password }));
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
