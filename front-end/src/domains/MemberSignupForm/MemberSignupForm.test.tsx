import { fireEvent, render, screen, userEvent } from "test-utils";
import MemberSignupForm from "./MemberSignupForm";

describe("Member/SignupForm", () => {
  const setup = () => {
    render(<MemberSignupForm />);

    const form = screen.getByRole("form", { name: "signup-form" });
    const emailInput = screen.getByRole("textbox", { name: "이메일" });
    const passwordInput = screen.getByLabelText("비밀번호");
    const passwordConfirmInput = screen.getByLabelText("비밀번호 확인");
    const nameInput = screen.getByLabelText("이름");
    const managerRadio = screen.getByRole("radio", { name: "manager" });
    const userRadio = screen.getByRole("radio", { name: "user" });
    const submitButton = screen.getByRole("button", { name: "submit" });

    return {
      form,
      emailInput,
      passwordInput,
      passwordConfirmInput,
      nameInput,
      managerRadio,
      userRadio,
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
  });

  describe("멤버타입", () => {
    test("멤버타입 라벨과 관리자와 사용자 라디오 버튼이 표시된다", () => {
      const { userRadio, managerRadio } = setup();

      expect(screen.getByText("멤버타입")).toBeInTheDocument();
      expect(managerRadio).toBeInTheDocument();
      expect(userRadio).toBeInTheDocument();
    });

    test("관리자 라디오 버튼을 클릭하면 관리자 라디오 버튼의 checked가 true가 된다", () => {
      const { managerRadio } = setup();

      userEvent.click(managerRadio, { button: 0 });

      expect(managerRadio).toBeChecked();
    });

    test("사용자 라디오 버튼을 클릭하면 사용자 라디오 버튼의 checked가 true가 된다", () => {
      const { userRadio } = setup();

      userEvent.click(userRadio, { button: 0 });

      expect(userRadio).toBeChecked();
    });
  });

  describe("제출 버튼", () => {
    test("제출 버튼이 표시된다", () => {
      const { submitButton } = setup();

      expect(submitButton).toBeInTheDocument();
      expect(submitButton).toHaveTextContent("제출");
    });

    test("valid한 입력값을 모두 입력한 후 제출 버튼을 클릭하면, 회원가입이 성공했다는 Alert가 뜬다", async () => {
      const {
        form,
        emailInput,
        passwordInput,
        passwordConfirmInput,
        nameInput,
        managerRadio,
        submitButton,
      } = setup();

      fireEvent.change(emailInput, { target: { value: "test@dd.com" } });
      fireEvent.blur(emailInput);
      fireEvent.change(passwordInput, { target: { value: "123" } });
      fireEvent.blur(passwordInput);
      fireEvent.change(passwordConfirmInput, { target: { value: "123" } });
      fireEvent.blur(passwordConfirmInput);
      fireEvent.change(nameInput, { target: { value: "동동" } });
      fireEvent.blur(nameInput);
      fireEvent.click(managerRadio);
      fireEvent.click(submitButton);

      expect(form).toHaveFormValues({
        email: "test@dd.com",
        password: "123",
        passwordConfirm: "123",
        name: "동동",
        memberType: "manager",
      });

      const alert = await screen.findByRole("alertdialog");

      expect(alert).toBeInTheDocument();
    });
  });
});
