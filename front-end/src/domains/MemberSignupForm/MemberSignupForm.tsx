import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth, useMoveToPage, useForm, getFormProps, getInputProps } from "../../hooks";
import { Input, Alert, Text, Loading } from "../../components";
import { StyledForm, SubmitButton } from "./MemberSignupForm.styled";
import { PATH } from "../../constants";
import {
  emailValidator,
  passwordValidator,
  passwordConfirmValidator,
  nameValidator,
} from "./validator";

interface MemberSignupFormProps {
  className?: string;
}

type Values = {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
};

const MemberSignupForm = (props: MemberSignupFormProps) => {
  const { signup, isLoading, isSucceed, isFailed, done } = useAuth();

  useEffect(() => done, [done]);

  const handleSubmit = ({ email, password, name }: Values) =>
    signup({
      email,
      password,
      labId: 1,
      name,
      memberType: "USER",
    });

  const { state, dispatch } = useForm<Values>({
    email: "",
    password: "",
    passwordConfirm: "",
    name: "",
  });

  const formProps = getFormProps({ state, dispatch, handleSubmit });

  const emailInputProps = getInputProps({
    state,
    dispatch,
    name: "email",
    label: "이메일",
    validator: emailValidator,
  });

  const passwordInputProps = getInputProps({
    state,
    dispatch,
    name: "password",
    label: "비밀번호",
    validator: passwordValidator,
  });

  const passwordConfirmInputProps = getInputProps({
    state,
    dispatch,
    name: "passwordConfirm",
    label: "비밀번호 확인",
    validator: (value) => passwordConfirmValidator(value, passwordInputProps.value),
  });

  const nameProps = getInputProps({
    state,
    dispatch,
    name: "name",
    label: "이름",
    validator: nameValidator,
  });

  const moveToLoginPage = useMoveToPage(PATH.MEMBER.LOGIN);

  return (
    <StyledForm {...formProps} {...props} aria-label="signup-form">
      {isLoading && <Loading size="lg" />}

      {isSucceed && (
        <Alert aria-label="succeed-alert" onConfirm={moveToLoginPage}>
          <Text>회원가입에 성공하였습니다.</Text>
        </Alert>
      )}

      {isFailed && (
        <Alert aria-label="회원가입 실패 알림창" onConfirm={done}>
          <Text>회원가입에 실패하였습니다.</Text>
        </Alert>
      )}

      <Input size="sm" {...emailInputProps} autoComplete="email" placeholder="example@gmail.com" />
      <Input size="sm" {...passwordInputProps} type="password" autoComplete="new-password" />
      <Input size="sm" {...passwordConfirmInputProps} type="password" autoComplete="new-password" />
      <Input size="sm" {...nameProps} autoComplete="name" placeholder="김동동" />
      <SubmitButton type="submit" aria-label="submit" color="secondary" disabled={isLoading}>
        제출
      </SubmitButton>
      <Link to={PATH.MEMBER.LOGIN}>
        <Text size="sm" className="signup-form__login">
          로그인하러 가기
        </Text>
      </Link>
    </StyledForm>
  );
};

export default MemberSignupForm;
