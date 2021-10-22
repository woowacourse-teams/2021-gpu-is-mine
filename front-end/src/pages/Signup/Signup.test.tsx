import { render, screen, waitFor, userEvent } from "../../__test__/test-utils";
import Signup from "./Signup";

describe("Member/SignupForm", () => {
  const setup = () => {
    render(<Signup />);

    const emailInput = screen.getByLabelText("이메일");
    const passwordInput = screen.getByLabelText("비밀번호");
    const passwordConfirmInput = screen.getByLabelText("비밀번호 확인");
    const nameInput = screen.getByLabelText("이름");
    const submitButton = screen.getByRole("button", { name: "submit" });

    return {
      emailInput,
      passwordInput,
      passwordConfirmInput,
      nameInput,
      submitButton,
    };
  };

  test("유효한 입력값을 모두 입력하지 않으면 제출 버튼이 disabled 되어 제출을 할 수 없다", async () => {
    const { emailInput, passwordInput, passwordConfirmInput, nameInput, submitButton } = setup();

    const validEmail = "test@dd.com";
    const validPassword = "123@cde!";
    const invalidPasswordConfirm = "invalid";
    const validName = "동동;";

    userEvent.type(emailInput, validEmail);
    userEvent.tab();
    userEvent.type(passwordInput, validPassword);
    userEvent.tab();
    userEvent.type(passwordConfirmInput, invalidPasswordConfirm);
    userEvent.tab();
    userEvent.type(nameInput, validName);
    userEvent.tab();

    expect(submitButton).toBeDisabled();
  });

  test("유효한 입력값을 모두 입력한 후 제출 버튼을 클릭하면, Loading 스피너가 표시되며 표시되며, 다이어로그를 통해 회원 가입 성공 메시지를 확인할 수 있다.", async () => {
    const { emailInput, passwordInput, passwordConfirmInput, nameInput, submitButton } = setup();

    const validEmail = "test@dd.com";
    const validPassword = "123@cde!";
    const validName = "동동;";

    userEvent.type(emailInput, validEmail);
    userEvent.tab();
    userEvent.type(passwordInput, validPassword);
    userEvent.tab();
    userEvent.type(passwordConfirmInput, validPassword);
    userEvent.tab();
    userEvent.type(nameInput, validName);
    userEvent.tab();

    userEvent.click(submitButton);

    await waitFor(() => expect(screen.getByRole("progressbar")).toBeInTheDocument());
    await waitFor(() => expect(screen.queryByRole("progressbar")).not.toBeInTheDocument());
    await waitFor(() => expect(screen.getByRole("dialog")).toBeInTheDocument());
    expect(screen.getByRole("dialog")).toHaveTextContent("회원가입에 성공하였습니다.");
  });
});
