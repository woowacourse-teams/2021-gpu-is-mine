import { ChangeEventHandler, FocusEvent } from "react";
import { SubmitAction, useFetch, useForm } from "../../hooks";
import { unwrapResult } from "../../hooks/useFetch/useFetch";
import { Radio, Button, Input, RadioGroup, Alert, Text } from "../../components";
import { API_ENDPOINT } from "../../constants";
import { MemberSignupRequest } from "../../types";

const SignupForm = () => {
  const { makeRequest, status } = useFetch<void, MemberSignupRequest>(API_ENDPOINT.MEMBERS, {
    method: "post",
  });

  const submitAction: SubmitAction = ({ email, password, name, memberType }) =>
    makeRequest({
      email: String(email),
      labId: 1,
      password: String(password),
      name: String(name),
      memberType: memberType === "manager" ? "manager" : "user",
    }).then(unwrapResult);

  const { form, useInput } = useForm(submitAction);

  const emailInputProps = useInput("", { name: "email", label: "이메일" });

  const passwordInputProps = useInput("", { name: "password", label: "비밀번호" });

  const passwordConfirmInputProps = useInput("", {
    name: "passwordConfirm",
    label: "비밀번호 확인",
  });

  const nameProps = useInput("", { name: "name", label: "이름" });

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

  return (
    <form {...form} aria-label="signup-form">
      {status === "succeed" && (
        <Alert aria-label="succeed-alert">
          <Text>회원가입에 성공하였습니다.</Text>
        </Alert>
      )}

      <Input {...emailInputProps} autoComplete="email" />
      <Input {...passwordInputProps} type="password" autoComplete="new-password" />
      <Input {...passwordConfirmInputProps} type="password" autoComplete="new-password" />
      <Input {...nameProps} autoComplete="name" />
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
      <Button type="submit" aria-label="submit" color="secondary-light">
        제출
      </Button>
    </form>
  );
};

export default SignupForm;
