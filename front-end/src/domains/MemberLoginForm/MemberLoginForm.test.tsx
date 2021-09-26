import { ContextType } from "react";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PATH } from "../../constants";
import { authContextValue } from "../../__fixtures__";
import { authContext } from "../../hooks/useAuth/useAuth";
import MemberLoginForm from "./MemberLoginForm";
import { emailValidator, passwordValidator } from "../MemberSignupForm/validator";
import { ThemeProvider } from "../../styles";

describe("Member/LoginForm", () => {
  const setup = (ctx?: ContextType<typeof authContext>) => {
    render(
      <ThemeProvider>
        <MemoryRouter>
          <authContext.Provider value={ctx ?? authContextValue}>
            <MemberLoginForm />
          </authContext.Provider>
        </MemoryRouter>
      </ThemeProvider>
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
    test("유효하지 않은 이메일 또는 비밀번호를 입력한 경우, Alert로 유효하지 않음을 알려준다", async () => {
      const ctx = {
        ...authContextValue,
        login: jest.fn(async ({ email, password }: { email: string; password: string }) => {
          if (emailValidator(email) !== "" || passwordValidator(password) !== "") {
            ctx.isFailed = true;
          }
        }),
      };

      const { emailInput, passwordInput, loginButton, loginForm } = setup(ctx);

      const validEmail = "test@dd.com";
      const invalidPassword = "123456";

      expect(emailValidator(validEmail) || passwordValidator(invalidPassword)).not.toBe("");

      userEvent.type(emailInput, validEmail);
      userEvent.tab();

      userEvent.type(passwordInput, invalidPassword);
      userEvent.tab();

      userEvent.click(loginButton);

      expect(loginForm).toHaveFormValues({ email: validEmail, password: invalidPassword });

      const alert = await screen.findByRole("dialog", { name: /alert/ });

      expect(alert).toBeInTheDocument();
      expect(alert).toHaveTextContent("이메일 또는 비밀번호를 확인해주세요");
    });

    test("유효한 이메일과 비밀번호를 입력하면 Alert가 표시되지 않는다", async () => {
      const ctx = {
        ...authContextValue,
        login: jest.fn(),
      };
      const { emailInput, passwordInput, loginButton, loginForm } = setup(ctx);

      // 유효한 이메일과 비밀번호를 정의한다
      const validEmail = "test@dd.com";
      const validPassword = "abcd1234!";
      expect(emailValidator(validEmail)).toBe("");
      expect(passwordValidator(validPassword)).toBe("");

      // 이메일과 비밀번호를 입력한다
      userEvent.type(emailInput, validEmail);
      userEvent.tab();
      userEvent.type(passwordInput, validPassword);
      userEvent.tab();
      userEvent.click(loginButton);

      // 이메일과 비밀번호가 폼에 잘 입력되었는지 확인한다
      expect(loginForm).toHaveFormValues({ email: validEmail, password: validPassword });
      expect(ctx.login).toHaveBeenCalledWith({
        email: validEmail,
        password: validPassword,
      });

      // 유효하지 않은 이메일과 비밀번호를 나타내는 Alert가 표시되지 않는 것을 확인한다
      expect(screen.queryByRole("dialog", { name: /alert/ })).not.toBeInTheDocument();
    });
  });
});
