import { MemoryRouter } from "react-router-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PATH } from "../../constants";
import { AuthProvider, PublicRoute } from "../../components";
import MemberLoginForm from "./MemberLoginForm";
import { emailValidator, passwordValidator } from "../MemberSignupForm/validator";
import { ThemeProvider } from "../../styles";

describe("Member/LoginForm", () => {
  const setup = () => {
    render(
      <ThemeProvider>
        <MemoryRouter initialEntries={["/"]}>
          <AuthProvider>
            <PublicRoute exact path="/">
              <MemberLoginForm />
            </PublicRoute>
          </AuthProvider>
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
      const { emailInput, passwordInput, loginButton, loginForm } = setup();

      const validEmail = "test@dd.com";
      const invalidPassword = "123456";

      expect(emailValidator(validEmail) || passwordValidator(invalidPassword)).not.toBe("");

      userEvent.type(emailInput, validEmail);
      userEvent.tab();

      userEvent.type(passwordInput, invalidPassword);
      userEvent.tab();

      userEvent.click(loginButton);

      expect(loginForm).toHaveFormValues({ email: validEmail, password: invalidPassword });

      const alert = await screen.findByRole("alertdialog", { name: /alert/ });

      expect(alert).toBeInTheDocument();
      expect(alert).toHaveTextContent("이메일 또는 비밀번호를 확인해주세요");
    });

    test("유효한 이메일과 비밀번호를 입력하면 Alert가 표시되지 않는다", async () => {
      const { emailInput, passwordInput, loginButton } = setup();

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
      expect(loginButton).toBeDisabled();

      // 유효하지 않은 이메일과 비밀번호를 나타내는 Alert가 표시되지 않는 것을 확인한다
      expect(screen.queryByRole("alertdialog", { name: /alert/ })).not.toBeInTheDocument();

      // 비동기 api 호출 중 로딩 스피너 표시
      await waitFor(() => expect(screen.queryByRole("progressbar")).toBeInTheDocument());

      // 비동기 api 호출 완료 후 로딩 스피너 제거
      await waitFor(() => expect(screen.queryByRole("progressbar")).not.toBeInTheDocument());

      // 로그인이 완료되면 PublicRoute에 의해 로그인폼이 렌더링되지 않는다
      await waitFor(() => {
        expect(screen.queryByRole("form", { name: /로그인/ })).not.toBeInTheDocument();
      });
    });
  });
});
