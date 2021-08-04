import { Link } from "react-router-dom";
import {
  useAuth,
  useMoveToPage,
  useForm,
  getFormProps,
  getInputProps,
  getRadioProps,
} from "../../hooks";
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
  const { signup, isLoading, isSucceed, isError, done } = useAuth();

  const handleSubmit = ({ email, password, name, memberType }: Values) =>
    signup({
      email,
      password,
      labId: 1,
      name,
      memberType: memberType === "MANAGER" ? "MANAGER" : "USER",
    });

  const { state, dispatch } = useForm<Values>({
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

  const memberTypeManagerProps = getRadioProps({
    state,
    dispatch,
    name: "memberType",
    label: "manager",
    value: "manager",
  });

  const memberTypeUserProps = getRadioProps({
    state,
    dispatch,
    name: "memberType",
    label: "user",
    value: "user",
  });

  const isRadioValidationMessageVisible =
    state.areValidationMessagesVisible.memberType && state.values.memberType === "";

  const moveToLoginPage = useMoveToPage(PATH.MEMBER.LOGIN);

  return (
    <StyledForm {...form} {...props} aria-label="signup-form">
      {isLoading && <Loading size="lg" />}

      {isSucceed && (
        <Alert aria-label="succeed-alert" onConfirm={moveToLoginPage}>
          <Text>회원가입에 성공하였습니다.</Text>
        </Alert>
      )}

      {isError && (
        <Alert aria-label="회원가입 실패 알림창" onConfirm={done}>
          <Text>회원가입에 실패하였습니다.</Text>
        </Alert>
      )}

      <Input size="sm" {...emailInputProps} autoComplete="email" placeholder="example@gmail.com" />
      <Input size="sm" {...passwordInputProps} type="password" autoComplete="new-password" />
      <Input size="sm" {...passwordConfirmInputProps} type="password" autoComplete="new-password" />
      <Input size="sm" {...nameProps} autoComplete="name" placeholder="김동동" />
      <RadioGroup label="멤버타입">
        <Radio {...memberTypeManagerProps} isValid={!isRadioValidationMessageVisible}>
          관리자
        </Radio>
        <Radio {...memberTypeUserProps} isValid={!isRadioValidationMessageVisible}>
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
