import { render, screen, fireEvent, waitFor } from "test-utils";
import { PATH, SESSION_STORAGE_KEY } from "../../constants";
import MemberLoginForm from "./MemberLoginForm";

const mockHistoryPush = jest.fn();

describe("Member/LoginForm", () => {
  const setup = () => {
    render(<MemberLoginForm />);

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
      alert,
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
    test.skip("유효하지 않은 이메일 또는 비밀번호를 입력한 경우, Alert로 유효하지 않음을 알려준다", async () => {
      const { emailInput, passwordInput, loginButton, loginForm } = setup();

      const validEmail = "test@dd.com";
      const invalidPassword = "123456";

      fireEvent.change(emailInput, { target: { value: validEmail } });
      fireEvent.blur(emailInput);

      fireEvent.change(passwordInput, { target: { value: invalidPassword } });
      fireEvent.blur(passwordInput);

      expect(loginForm).toHaveFormValues({ email: validEmail, password: invalidPassword });

      fireEvent.click(loginButton, { button: 0 });

      const alert = await screen.findByRole("alertdialog");

      expect(alert).toBeInTheDocument();
      expect(alert).toHaveTextContent("이메일 또는 비밀번호를 확인해주세요");
    });

    const login = () => {
      jest.mock("react-router-dom", () => ({
        ...jest.requireActual("react-router-dom"),
        useHistory: () => ({
          push: mockHistoryPush,
        }),
      }));

      const elements = setup();

      const { emailInput, passwordInput, loginButton, loginForm } = elements;

      const validEmail = "test@dd.com";
      const validPassword = "123456*a";

      fireEvent.change(emailInput, { target: { value: validEmail } });
      fireEvent.blur(emailInput);

      fireEvent.change(passwordInput, { target: { value: validPassword } });
      fireEvent.blur(passwordInput);

      expect(loginForm).toHaveFormValues({ email: validEmail, password: validPassword });

      fireEvent.click(loginButton, { button: 0 });

      return elements;
    };

    test.skip("유효한 이메일 또는 비밀번호를 입력한 경우, 로그인이 되고 GpuServer조회 페이지로 이동한다", async () => {
      login();

      await waitFor(() => expect(mockHistoryPush).toBeCalled());
    });

    test.skip("로그인에 성공하여 반환된 accessToken을 sessionStorage에 저장한다", () => {
      login();
      const sessionStorageSetItemSpy = jest.spyOn(Storage.prototype, "setItem");

      expect(sessionStorageSetItemSpy).toBeCalled();

      expect(sessionStorage.getItem(SESSION_STORAGE_KEY.ACCESS_TOKEN)).toBe("access-token");
    });
  });
});
