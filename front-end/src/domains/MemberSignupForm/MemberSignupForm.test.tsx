import { fireEvent, render, screen, userEvent } from "../../__test__/test-utils";
import { emailValidator, nameValidator, passwordValidator, VALIDATION_MESSAGE } from "./validator";
import MemberSignupForm from "./MemberSignupForm";

describe("Member/SignupForm", () => {
  const setup = () => {
    render(<MemberSignupForm />);

    const form = screen.getByRole("form", { name: "signup-form" });
    const emailInput = screen.getByLabelText("이메일");
    const passwordInput = screen.getByLabelText("비밀번호");
    const passwordConfirmInput = screen.getByLabelText("비밀번호 확인");
    const nameInput = screen.getByLabelText("이름");
    const managerRadio = screen.getByRole("radio", { name: /관리자/ });
    const userRadio = screen.getByRole("radio", { name: /사용자/ });
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

  describe("validator", () => {
    test("이메일", () => {
      expect(emailValidator("")).toBe(VALIDATION_MESSAGE.EMAIL);
      expect(emailValidator("1@")).toBe(VALIDATION_MESSAGE.EMAIL);
      expect(emailValidator("r3s@sdf.")).toBe(VALIDATION_MESSAGE.EMAIL);
      expect(emailValidator("33@3sdf")).toBe(VALIDATION_MESSAGE.EMAIL);
      expect(emailValidator("dd@gmail.com")).toBe("");
      expect(emailValidator("wannte@gpuismine.lab")).toBe("");
    });

    test("비밀번호는 특수문자를 1개 이상 포함하여야 한다", () => {
      expect(passwordValidator("1234c6735")).toBe(VALIDATION_MESSAGE.PASSWORD.SPECIAL_CHARACTER);
      expect(passwordValidator("1234567890abcdefghij1234567890")).toBe(
        VALIDATION_MESSAGE.PASSWORD.SPECIAL_CHARACTER
      );
      expect(passwordValidator("123a56#8")).toBe("");
      expect(passwordValidator("12345@7890abcdefghij1234567890ab")).toBe("");
    });

    test("비밀번호는 숫자를 1개 이상 포함하여야 한다", () => {
      expect(passwordValidator("abcdefgh*ij")).toBe(VALIDATION_MESSAGE.PASSWORD.NUMBER_CHARACTER);
      expect(passwordValidator("!@#$%^&*()_+c")).toBe(VALIDATION_MESSAGE.PASSWORD.NUMBER_CHARACTER);
      expect(passwordValidator("password!1")).toBe("");
      expect(passwordValidator(`valid_password_\\3`)).toBe("");
    });

    test("비밀번호는 알파벳을 1개 이상 포함하여야 한다", () => {
      expect(passwordValidator("1234567*0")).toBe(VALIDATION_MESSAGE.PASSWORD.ALPHABET_CHARACTER);
      expect(passwordValidator("!@#$%^&*()_+1")).toBe(
        VALIDATION_MESSAGE.PASSWORD.ALPHABET_CHARACTER
      );

      expect(passwordValidator("1234567*0a")).toBe("");
      expect(passwordValidator(`!@c#$%^&*()_+1`)).toBe("");
    });

    test(`비밀번호는 특수문자(~!@#$%^&*()-_=+[{]}\\|;:'",<.>/?), 숫자, 영문자로만 구성된다 `, () => {
      expect(passwordValidator("ㄱa1234567*0")).toBe(VALIDATION_MESSAGE.PASSWORD.INVALID_CHARACTER);
      expect(passwordValidator("1234567*0aアンドロイド")).toBe(
        VALIDATION_MESSAGE.PASSWORD.INVALID_CHARACTER
      );
      expect(passwordValidator(`!@c#$%^&*()_用+1`)).toBe(
        VALIDATION_MESSAGE.PASSWORD.INVALID_CHARACTER
      );
    });

    test("비밀번호는 최소 8자 최대 32자로 이루어져 있다. ", () => {
      expect(passwordValidator("")).toBe(VALIDATION_MESSAGE.PASSWORD.LENGTH);
      expect(passwordValidator("1!34c67")).toBe(VALIDATION_MESSAGE.PASSWORD.LENGTH);
      expect(passwordValidator("12!4567890abcdefghij1234567890abc")).toBe(
        VALIDATION_MESSAGE.PASSWORD.LENGTH
      );
      expect(passwordValidator("123a56*8")).toBe("");
      expect(passwordValidator("12345@7890abcdefghij1234567890ab")).toBe("");
    });

    test("이름은 최소 2자 최대 15자로 이루어져 있다. ", () => {
      expect(nameValidator("")).toBe(VALIDATION_MESSAGE.NAME);
      expect(nameValidator("동")).toBe(VALIDATION_MESSAGE.NAME);
      expect(nameValidator("나는열다섯자이상의이름을가진사람")).toBe(VALIDATION_MESSAGE.NAME);
      expect(nameValidator("동딩댕123")).toBe("");
      expect(nameValidator("アンドロイド")).toBe("");
    });
  });

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

    test("이메일 input의 placeholder는 example@gmail.com 이다", () => {
      const { emailInput } = setup();

      expect(emailInput).toHaveAttribute("placeholder", "example@gmail.com");
    });

    test.skip("invalid한 이메일을 입력하면 validationMessage가 표시된다", () => {
      const { emailInput } = setup();

      userEvent.type(emailInput, "1@");

      expect(emailInput).toHaveValue("1@");
      expect(screen.getByText("형식에 맞지 않은 이메일입니다")).toBeInTheDocument();
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

    test("이름 input의 placeholder는 김동동 이다", () => {
      const { nameInput } = setup();

      expect(nameInput).toHaveAttribute("placeholder", "김동동");
    });
  });

  describe("멤버타입", () => {
    test("멤버타입 라벨과 관리자와 사용자 라디오 버튼이 표시된다", () => {
      const { userRadio, managerRadio } = setup();

      expect(screen.getByText("멤버타입")).toBeInTheDocument();
      expect(managerRadio).toBeInTheDocument();
      expect(userRadio).toBeInTheDocument();
    });

    test.skip("관리자 라디오 버튼을 클릭하면 관리자 라디오 버튼의 checked가 true가 된다", () => {
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

      const validEmail = "test@dd.com";
      const validPassword = "123@cde!";
      const validName = "동동;";

      fireEvent.change(emailInput, { target: { value: validEmail } });
      fireEvent.blur(emailInput);
      fireEvent.change(passwordInput, { target: { value: validPassword } });
      fireEvent.blur(passwordInput);
      fireEvent.change(passwordConfirmInput, { target: { value: validPassword } });
      fireEvent.blur(passwordConfirmInput);
      fireEvent.change(nameInput, { target: { value: validName } });
      fireEvent.blur(nameInput);
      fireEvent.click(managerRadio);
      fireEvent.click(submitButton);

      expect(form).toHaveFormValues({
        email: validEmail,
        password: validPassword,
        passwordConfirm: validPassword,
        name: validName,
        memberType: "manager",
      });

      const alert = await screen.findByRole("alertdialog");

      expect(alert).toBeInTheDocument();
    });
  });
});
