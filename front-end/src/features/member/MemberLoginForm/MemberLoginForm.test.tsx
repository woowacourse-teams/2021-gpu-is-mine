import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PATH } from "../../../constants";
import MemberLoginForm from "./MemberLoginForm";
import { emailValidator, passwordValidator } from "../validator/validator";
import Providers from "../../../providers/Providers";

describe("Member/LoginForm", () => {
  const setup = () => {
    render(
      <Providers>
        <MemberLoginForm />
      </Providers>
    );

    const loginForm = screen.getByRole("form", { name: /로그인/ });

    const emailLabel = screen.getByText("이메일");
    const emailInput = screen.getByLabelText("이메일");

    const passwordLabel = screen.getByText("비밀번호");
    const passwordInput = screen.getByLabelText("비밀번호");

    const loginButton = screen.getByRole("button", { name: "로그인" });
    const signupLink = screen.getByRole("link", { name: "아직 회원이 아니신가요?" });

    return {
      loginForm,
      emailLabel,
      emailInput,
      passwordLabel,
      passwordInput,
      loginButton,
      signupLink,
    };
  };

  describe("최초 접근시 화면", () => {
    test("이메일 라벨과 input이 표시된다", () => {
      const { emailLabel, emailInput } = setup();

      expect(emailLabel).toBeInTheDocument();
      expect(emailInput).toBeInTheDocument();
    });

    test("이메일 input의 초기값은 빈문자열이다", () => {
      const { emailInput } = setup();

      expect(emailInput).toHaveValue("");
    });

    test("이메일 input의 name은 email이다", () => {
      const { emailInput } = setup();

      expect(emailInput).toHaveAttribute("name", "email");
    });

    test("이메일 input의 autoComplete 속성은 email이다", () => {
      const { emailInput } = setup();

      expect(emailInput).toHaveAttribute("autoComplete", "email");
    });

    test("비밀번호 라벨과 input이 표시된다", () => {
      const { passwordLabel, passwordInput } = setup();

      expect(passwordLabel).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
    });

    test("비밀번호 input의 type은 password이다", () => {
      const { passwordInput } = setup();

      expect(passwordInput).toHaveAttribute("type", "password");
    });

    test("비밀번호 input의 초기값은 빈문자열이다", () => {
      const { passwordInput } = setup();

      expect(passwordInput).toHaveValue("");
    });

    test("비밀번호 input의 name은 password이다", () => {
      const { passwordInput } = setup();

      expect(passwordInput).toHaveAttribute("name", "password");
    });

    test("비밀번호 input의 autoComplete 속성은 current-password이다", () => {
      const { passwordInput } = setup();

      expect(passwordInput).toHaveAttribute("autoComplete", "current-password");
    });

    test("로그인 버튼이 표시된다", () => {
      const { loginButton } = setup();

      expect(loginButton).toBeInTheDocument();
    });

    test("회원가입 링크의 문구는 '아직 회원이 아니신가요?'이다", () => {
      const { signupLink } = setup();

      expect(signupLink).toHaveTextContent("아직 회원이 아니신가요");
    });

    test("회원가입 링크 route check", () => {
      const { signupLink } = setup();

      expect(signupLink).toHaveAttribute("href", PATH.MEMBER.SIGNUP);
    });
  });

  describe("제출", () => {
    test("이메일과 비밀번호를 입력하여 로그인 버튼을 클릭하면 로그인 버튼이 disabled 된다", async () => {
      const { emailInput, passwordInput, loginButton, loginForm } = setup();

      const validEmail = "test@dd.com";
      const invalidPassword = "123456";

      expect(emailValidator(validEmail) || passwordValidator(invalidPassword)).not.toBe("");

      userEvent.type(emailInput, validEmail);
      userEvent.tab();

      userEvent.type(passwordInput, invalidPassword);
      userEvent.tab();

      expect(loginForm).toHaveFormValues({ email: validEmail, password: invalidPassword });

      userEvent.click(loginButton);

      expect(loginButton).toBeDisabled();

      await waitFor(() => expect(loginButton).toBeEnabled());
    });
  });
});
