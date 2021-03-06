import { render, screen, waitFor, userEvent } from "../../__test__/test-utils";
import Login from "./Login";
import { emailValidator, passwordValidator } from "../../features/member/validator/validator";
import { PublicRoute } from "../../routes";
import "../../__mocks__/matchMedia";

describe("pages/Login", () => {
  const setup = () => {
    render(
      <PublicRoute exact path="/">
        <Login />
      </PublicRoute>
    );

    const emailInput = screen.getByLabelText("이메일");

    const passwordInput = screen.getByLabelText("비밀번호");

    const loginButton = screen.getByRole("button", { name: "로그인" });

    return {
      emailInput,
      passwordInput,
      loginButton,
    };
  };

  test("유효하지 않은 이메일 또는 비밀번호를 입력한 경우, Toast로 유효하지 않음을 알려준다", async () => {
    const { emailInput, passwordInput, loginButton } = setup();

    const validEmail = "test@dd.com";
    const invalidPassword = "123456";

    expect(emailValidator(validEmail) || passwordValidator(invalidPassword)).not.toBe("");

    userEvent.type(emailInput, validEmail);
    userEvent.tab();

    userEvent.type(passwordInput, invalidPassword);
    userEvent.tab();

    userEvent.click(loginButton);

    const alert = await screen.findByRole("alert");

    expect(alert).toBeInTheDocument();
    expect(alert).toHaveTextContent("이메일 또는 비밀번호를 확인해주세요");
  });

  test("유효한 이메일과 비밀번호를 입력하여 로그인이 되면, PublicRoute에 의해 로그인 페이지에 머물러 있을 수 없다", async () => {
    const { emailInput, passwordInput, loginButton } = setup();

    const validEmail = "test@dd.com";
    const validPassword = "abcd1234!!";

    expect(emailValidator(validEmail)).toBe("");
    expect(passwordValidator(validPassword)).toBe("");

    userEvent.type(emailInput, validEmail);
    userEvent.tab();

    userEvent.type(passwordInput, validPassword);
    userEvent.tab();

    userEvent.click(loginButton);

    await waitFor(() => expect(screen.queryByText("딥러닝 학습 자동화")).not.toBeInTheDocument());
  });
});
