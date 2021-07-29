import { Link } from "react-router-dom";
import { isEmail } from "../../utils";
import { useBoolean, useForm, useAuth } from "../../hooks";
import { Alert, Input, Text, Loading } from "../../components";
import { StyledForm, SubmitButton } from "./MemberLoginForm.styled";
import { PATH } from "../../constants";
import { passwordValidator } from "../MemberSignupForm/validator";

interface MemberLoginFormProps {
  className?: string;
}

const MemberLoginForm = ({ className }: MemberLoginFormProps) => {
  const [isAlertOpen, openAlert, closeAlert] = useBoolean(false);
  const { login, isLoading } = useAuth();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const submitAction: any = async ({ email, password }: { email: string; password: string }) => {
    const isValid = [isEmail(String(email)), passwordValidator(String(password)) === ""].every(
      Boolean
    );

    if (!isValid) {
      openAlert();
      return;
    }

    try {
      await login({ email: String(email), password: String(password) });
    } catch (err) {
      console.error();
      openAlert();

      throw err;
    }
  };

  const { form, submit, useInput } = useForm(submitAction);

  const emailInputProps = useInput("", { label: "이메일", name: "email" });

  const passwordInputProps = useInput("", { label: "비밀번호", name: "password" });

  return (
    <StyledForm {...form} aria-label="로그인" className={className}>
      {isLoading && <Loading size="lg" />}
      <Alert isOpen={isAlertOpen} close={closeAlert}>
        이메일 또는 비밀번호를 확인해주세요
      </Alert>
      <Input size="sm" {...emailInputProps} autoComplete="email" placeholder="example@gamil.com" />
      <Input size="sm" {...passwordInputProps} autoComplete="current-password" type="password" />
      <SubmitButton color="secondary" {...submit}>
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
