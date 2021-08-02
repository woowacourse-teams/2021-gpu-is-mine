import { ChangeEventHandler, FocusEvent } from "react";
import { Link } from "react-router-dom";
import { useAuth, useMoveToPage } from "../../hooks";
import useFormNew, { getFormProps, getInputProps } from "../../hooks/useFormNew/useFormNew";
import { Radio, Input, RadioGroup, Alert, Text, Loading } from "../../components";
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
  memberType: "MANAGER" | "USER" | "";
};

const MemberSignupForm = (props: MemberSignupFormProps) => {
  const { signup, isLoading, isSucceed } = useAuth();

  const handleSubmit = ({ email, password, name, memberType }: Values) =>
    signup({
      email,
      password,
      labId: 1,
      name,
      memberType: memberType === "MANAGER" ? "MANAGER" : "USER",
    });

  const { state, dispatch } = useFormNew<Values>({
    email: "",
    password: "",
    passwordConfirm: "",
    name: "",
    memberType: "",
  });

  const form = getFormProps({ state, dispatch, handleSubmit });

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

  const {
    validationMessage,
    label,
    value: radioGroupValue,
    onChange,
    onBlur,
    ...memberTypeProps
  } = getInputProps({ state, dispatch, name: "memberType", label: "멤버타입" });

  const handleRadioChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    onChange(event);
    onBlur(event as FocusEvent<HTMLInputElement>);
  };

  const moveToLoginPage = useMoveToPage(PATH.MEMBER.LOGIN);

  return (
    <StyledForm {...form} {...props} aria-label="signup-form">
      {isLoading && <Loading size="lg" />}
      {isSucceed && (
        <Alert aria-label="succeed-alert" onConfirm={moveToLoginPage}>
          <Text>회원가입에 성공하였습니다.</Text>
        </Alert>
      )}

      <Input size="sm" {...emailInputProps} autoComplete="email" placeholder="example@gmail.com" />
      <Input size="sm" {...passwordInputProps} type="password" autoComplete="new-password" />
      <Input size="sm" {...passwordConfirmInputProps} type="password" autoComplete="new-password" />
      <Input size="sm" {...nameProps} autoComplete="name" placeholder="김동동" />
      <RadioGroup label="멤버타입">
        <Radio
          {...memberTypeProps}
          value="manager"
          aria-label="manager"
          onChange={handleRadioChange}
          checked={radioGroupValue === "manager"}
          disabled
        >
          관리자
        </Radio>
        <Radio
          {...memberTypeProps}
          value="user"
          aria-label="user"
          onChange={handleRadioChange}
          checked={radioGroupValue === "user"}
        >
          사용자
        </Radio>
      </RadioGroup>
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
