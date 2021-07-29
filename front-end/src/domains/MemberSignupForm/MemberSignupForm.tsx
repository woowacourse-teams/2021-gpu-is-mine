import { ChangeEventHandler, FocusEvent } from "react";
import { Link, useHistory } from "react-router-dom";
import { SubmitAction, useFetch, useForm } from "../../hooks";
import { unwrapResult } from "../../hooks/useFetch/useFetch";
import { Radio, Input, RadioGroup, Alert, Text, Loading } from "../../components";
import { StyledForm, SubmitButton } from "./MemberSignupForm.styled";
import { PATH, API_ENDPOINT } from "../../constants";
import { MemberSignupRequest } from "../../types";
import {
  emailValidator,
  passwordValidator,
  passwordConfirmValidator,
  nameValidator,
} from "./validator";

interface MemberSignupFormProps {
  className?: string;
}

const MemberSignupForm = (props: MemberSignupFormProps) => {
  const { makeRequest, status } = useFetch<void, MemberSignupRequest>(API_ENDPOINT.MEMBERS, {
    method: "post",
  });

  const history = useHistory();

  const submitAction: SubmitAction = ({ email, password, name, memberType }) =>
    makeRequest({
      email: String(email),
      labId: 1,
      password: String(password),
      name: String(name),
      memberType: memberType === "MANAGER" ? "MANAGER" : "USER",
    }).then(unwrapResult);

  const { form, useInput } = useForm(submitAction);

  const emailInputProps = useInput("", {
    name: "email",
    label: "이메일",
    validator: emailValidator,
  });

  const passwordInputProps = useInput("", {
    name: "password",
    label: "비밀번호",
    validator: passwordValidator,
  });

  const passwordConfirmInputProps = useInput("", {
    name: "passwordConfirm",
    label: "비밀번호 확인",
    validator: (value) => passwordConfirmValidator(value, String(passwordInputProps.value)),
  });

  const nameProps = useInput("", { name: "name", label: "이름", validator: nameValidator });

  const {
    validationMessage,
    label,
    value: radioGroupValue,
    onChange,
    onBlur,
    ...memberTypeProps
  } = useInput("", {
    name: "memberType",
    label: "멤버타입",
  });

  const handleRadioChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    onChange(event);
    onBlur(event as FocusEvent<HTMLInputElement>);
  };

  const moveToLoginPage = () => history.push(PATH.MEMBER.LOGIN);

  return (
    <StyledForm {...form} {...props} aria-label="signup-form">
      {status === "loading" && <Loading size="lg" />}
      {status === "succeed" && (
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
          onChange={handleRadioChange}
          value="manager"
          aria-label="manager"
          checked={radioGroupValue === "manager"}
        >
          관리자
        </Radio>
        <Radio
          {...memberTypeProps}
          value="user"
          onChange={handleRadioChange}
          aria-label="user"
          checked={radioGroupValue === "user"}
        >
          사용자
        </Radio>
      </RadioGroup>
      <SubmitButton
        type="submit"
        aria-label="submit"
        color="secondary"
        disabled={status === "loading"}
      >
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
