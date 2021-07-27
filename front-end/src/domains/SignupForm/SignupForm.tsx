import { useForm } from "../../hooks";
import { Button, Input, RadioGroup } from "../../components";
import Radio from "../../components/Radio/Radio";

const SignupForm = () => {
  const { form, useInput } = useForm(() => {});

  const emailInputProps = useInput("", { name: "email", label: "이메일" });

  const passwordInputProps = useInput("", { name: "password", label: "비밀번호" });

  const passwordConfirmProps = useInput("", { name: "password-confirm", label: "비밀번호 확인" });

  const nameProps = useInput("", { name: "name", label: "이름" });

  const {
    validationMessage,
    label,
    value: radioGroupValue,
    ...memberTypeProps
  } = useInput("", {
    name: "member-type",
    label: "멤버타입",
  });

  return (
    <form {...form}>
      <Input {...emailInputProps} autoComplete="email" />
      <Input {...passwordInputProps} type="password" autoComplete="new-password" />
      <Input {...passwordConfirmProps} type="password" autoComplete="new-password" />
      <Input {...nameProps} autoComplete="name" />
      <RadioGroup label="멤버타입">
        <Radio
          {...memberTypeProps}
          value="manager"
          aria-label="manager"
          checked={radioGroupValue === "manager"}
        >
          관리자
        </Radio>
        <Radio
          {...memberTypeProps}
          value="user"
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
