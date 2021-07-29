import { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { isEmail } from "../../utils";
import { useBoolean, useForm, useFetch } from "../../hooks";
import { Alert, Input, Text } from "../../components";
import { StyledForm, SubmitButton } from "./MemberLoginForm.styled";
import { PATH, API_ENDPOINT } from "../../constants";
import { MemberLoginRequest, MemberLoginResponse } from "../../types";
import { passwordValidator } from "../MemberSignupForm/validator";

interface MemberLoginFormProps {
  className?: string;
}

const MemberLoginForm = ({ className }: MemberLoginFormProps) => {
  const history = useHistory();

  const [isAlertOpen, openAlert, closeAlert] = useBoolean(false);

  const { data, makeRequest, status } = useFetch<MemberLoginResponse, MemberLoginRequest>(
    API_ENDPOINT.LOGIN,
    {
      method: "post",
    }
  );

  // const {
  //   data: myInfo,
  //   makeRequest: fetchMyInfo,
  //   status: myInfoStatus,
  // } = useFetch<MyInfoResponse>(API_ENDPOINT.ME, {
  //   method: "get",
  // });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const submitAction: any = async ({ email, password }: { email: string; password: string }) => {
    const isValid = [isEmail(String(email)), passwordValidator(String(password)) === ""].every(
      Boolean
    );

    if (!isValid) {
      openAlert();
      return;
    }

    // eslint-disable-next-line consistent-return
    return (
      await makeRequest({
        email: String(email),
        password: String(password),
      })
    ).unwrap();
  };

  useEffect(() => {
    if (status === "succeed") {
      if (!data) {
        return;
      }

      const { accessToken } = data;

      sessionStorage.setItem("accessToken", accessToken);

      history.push(PATH.MANAGER.GPU_SERVER.VIEW);
    }
  }, [history, status, data]);

  const { form, submit, useInput } = useForm(submitAction);

  const emailInputProps = useInput("", { label: "이메일", name: "email" });

  const passwordInputProps = useInput("", { label: "비밀번호", name: "password" });

  return (
    <StyledForm {...form} aria-label="로그인" className={className}>
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
