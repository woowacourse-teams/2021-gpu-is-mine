import { HTMLAttributes } from "react";
import { Link } from "react-router-dom";
import { useForm, getFormProps, getInputProps, useMoveToPage } from "../../../hooks";
import { Input, Loading, Text, useToast } from "../../../components";
import { StyledForm, SubmitButton } from "./MemberSignupForm.styled";
import { PATH } from "../../../constants";
import {
  emailValidator,
  passwordValidator,
  passwordConfirmValidator,
  nameValidator,
} from "../validator/validator";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectSignupStatus, signup } from "../signupSlice";
import type { RequiredSerializedError } from "../../job/jobSlice";

type MemberSignupFormProps = HTMLAttributes<HTMLFormElement>;

type Values = {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
};

const MemberSignupForm = ({ ...rest }: MemberSignupFormProps) => {
  const { isLoading } = useAppSelector(selectSignupStatus);

  const appDispatch = useAppDispatch();

  const moveToLoginPage = useMoveToPage(PATH.MEMBER.LOGIN);

  const showToast = useToast();

  const handleSubmit = async ({ email, password, name }: Values) => {
    try {
      await appDispatch(
        signup({
          email,
          password,
          name,
        })
      ).unwrap();

      showToast({
        type: "success",
        title: "회원가입에 성공하였습니다",
        message: `${name}님! 반갑습니다 :)`,
      });

      moveToLoginPage();
    } catch (err) {
      const error = err as RequiredSerializedError;

      showToast({
        type: "error",
        title: error.name,
        message: error.message,
      });
    }
  };

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
    validator: (value) =>
      passwordConfirmValidator(value, passwordInputProps.value) || passwordValidator(value),
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
      {isLoading && <Loading size="lg" />}

      <Input size="sm" {...emailInputProps} autoComplete="email" placeholder="example@email.com" />
      <Input size="sm" {...passwordInputProps} type="password" autoComplete="new-password" />
      <Input size="sm" {...passwordConfirmInputProps} type="password" autoComplete="new-password" />
      <Input size="sm" {...nameProps} autoComplete="name" />
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
