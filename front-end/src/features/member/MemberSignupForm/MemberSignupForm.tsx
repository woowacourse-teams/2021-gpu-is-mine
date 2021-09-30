import { HTMLAttributes } from "react";
import { Link } from "react-router-dom";
import { useForm, getFormProps, getInputProps } from "../../../hooks";
import { Input, Text } from "../../../components";
import { StyledForm, SubmitButton } from "./MemberSignupForm.styled";
import { PATH } from "../../../constants";
import {
  emailValidator,
  passwordValidator,
  passwordConfirmValidator,
  nameValidator,
} from "../validator/validator";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectLoginStatus, signup } from "../memberSlice";

type MemberSignupFormProps = HTMLAttributes<HTMLFormElement>;

type Values = {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
};

const MemberSignupForm = ({ ...rest }: MemberSignupFormProps) => {
  const appDispatch = useAppDispatch();
  const { isLoading } = useAppSelector(selectLoginStatus);

  const handleSubmit = ({ email, password, name }: Values) => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    appDispatch(
      signup({
        email,
        password,
        name,
      })
    );
  };

  const { state, dispatch } = useForm<Values>({
    email: "",
    password: "",
    passwordConfirm: "",
    name: "",
  });

  const disabled = isLoading || !state.isFormValid;

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

  return (
    <StyledForm {...formProps} {...rest} aria-label="signup-form">
      <Input size="sm" {...emailInputProps} autoComplete="email" placeholder="example@gmail.com" />
      <Input size="sm" {...passwordInputProps} type="password" autoComplete="new-password" />
      <Input size="sm" {...passwordConfirmInputProps} type="password" autoComplete="new-password" />
      <Input size="sm" {...nameProps} autoComplete="name" placeholder="김동동" />
      <SubmitButton type="submit" aria-label="submit" color="secondary" disabled={disabled}>
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
