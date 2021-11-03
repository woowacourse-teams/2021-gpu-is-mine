import { render, screen, userEvent, waitFor } from "../../../__test__/test-utils";
import { VALIDATION_MESSAGE } from "../validator/validator";
import MemberSignupForm from "./MemberSignupForm";

describe("Member/SignupForm", () => {
  const setup = () => {
    render(<MemberSignupForm />);

    const form = screen.getByRole("form", { name: "signup-form" });
    const emailInput = screen.getByLabelText("이메일");
    const passwordInput = screen.getByLabelText("비밀번호");
    const passwordConfirmInput = screen.getByLabelText("비밀번호 확인");
    const nameInput = screen.getByLabelText("이름");
    const submitButton = screen.getByRole("button", { name: "submit" });

    return {
      form,
      emailInput,
      passwordInput,
      passwordConfirmInput,
      nameInput,
      submitButton,
    };
  };

  describe("이메일", () => {
    test("이메일 라벨과 input이 표시된다", () => {
      const { emailInput } = setup();

      expect(screen.getByText("이메일")).toBeInTheDocument();
      expect(emailInput).toBeInTheDocument();
    });

    test("이메일 input의 autoComplete속성은 email 이다", () => {
      const { emailInput } = setup();

      expect(emailInput).toHaveAttribute("autoComplete", "email");
    });

    test("이메일 input의 placeholder는 example@email.com 이다", () => {
      const { emailInput } = setup();

      expect(emailInput).toHaveAttribute("placeholder", "example@email.com");
    });

    test("invalid한 이메일을 입력하면 validationMessage가 표시된다", () => {
      const { emailInput } = setup();

      userEvent.type(emailInput, "1@");
      userEvent.tab();

      expect(emailInput).toHaveValue("1@");
      expect(screen.getByText(/형식에 맞지 않은 이메일입니다/)).toBeInTheDocument();
    });
  });

  describe("비밀번호", () => {
    test("비밀번호 라벨과 input, 비밀번호 확인 라벨과 input이 표시된다", () => {
      const { passwordInput, passwordConfirmInput } = setup();

      expect(screen.getByText("비밀번호")).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();

      expect(screen.getByText("비밀번호 확인")).toBeInTheDocument();
      expect(passwordConfirmInput).toBeInTheDocument();
    });

    test("비밀번호 input과 비밀번호 확인 input은 autoComplete 속성이 new-password이다", () => {
      const { passwordInput, passwordConfirmInput } = setup();

      expect(passwordInput).toHaveAttribute("autoComplete", "new-password");
      expect(passwordConfirmInput).toHaveAttribute("autoComplete", "new-password");
    });
  });

  describe("이름", () => {
    test("이름 라벨과 input이 표시된다", () => {
      const { nameInput } = setup();

      expect(screen.getByText("이름")).toBeInTheDocument();
      expect(nameInput).toBeInTheDocument();
    });

    test("이름 input의 autocomplete 속성은 name이다", () => {
      const { nameInput } = setup();

      expect(nameInput).toHaveAttribute("autoComplete", "name");
    });

    test("이름 input의 placeholder는 없다", () => {
      const { nameInput } = setup();

      expect(nameInput).not.toHaveAttribute("placeholder");
    });
  });

  describe("제출 버튼", () => {
    test("제출 버튼이 표시된다", () => {
      const { submitButton } = setup();

      expect(submitButton).toBeInTheDocument();
      expect(submitButton).toHaveTextContent("제출");
    });

    test("유효한 입력값을 모두 입력하지 않고 제출 버튼을 클릭하면 validationMessage가 표시되고 실제 제출되지 않는다", async () => {
      const { emailInput, nameInput } = setup();

      const validEmail = "test@dd.com";
      const validName = "동동;";

      userEvent.type(emailInput, validEmail);
      userEvent.tab();
      userEvent.type(nameInput, validName);
      userEvent.tab();

      expect(screen.getByText(VALIDATION_MESSAGE.PASSWORD.LENGTH)).toBeInTheDocument();
      await waitFor(() => expect(screen.queryByRole("alert")).not.toBeInTheDocument());
    });

    test("입력한 Input값이 모두 유효하지 않으면 validationMessage가 표시되고 실제 제출되지 않는다", async () => {
      const { form, emailInput, passwordInput, passwordConfirmInput, nameInput, submitButton } =
        setup();

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
      userEvent.click(submitButton);

      expect(form).toHaveFormValues({
        email: validEmail,
        password: validPassword,
        passwordConfirm: invalidPasswordConfirm,
        name: validName,
      });

      expect(screen.getByText(VALIDATION_MESSAGE.PASSWORD_CONFIRM)).toBeInTheDocument();
      await waitFor(() => expect(screen.queryByRole("alert")).not.toBeInTheDocument());
    });

    test("valid한 입력값을 모두 입력한 후 제출 버튼을 클릭하면, 회원가입이 성공했다는 toast가 뜬다", async () => {
      const { form, emailInput, passwordInput, passwordConfirmInput, nameInput, submitButton } =
        setup();

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

      expect(form).toHaveFormValues({
        email: validEmail,
        password: validPassword,
        passwordConfirm: validPassword,
        name: validName,
      });

      await waitFor(() => expect(screen.getByRole("alert")).toBeInTheDocument());
      expect(screen.getByRole("alert")).toHaveTextContent(/회원가입에 성공하였습니다/);
    });
  });
});
