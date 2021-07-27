import { render, screen, userEvent } from "test-utils";

import SignupForm from "./SignupForm";

describe("SignupForm", () => {
  describe("이메일", () => {
    test("이메일 라벨과 input이 표시된다", () => {
      render(<SignupForm />);

      expect(screen.getByText("이메일")).toBeInTheDocument();
      expect(screen.getByLabelText("이메일")).toBeInTheDocument();
    });

    test("이메일 input의 autoComplete속성은 email 이다", () => {
      render(<SignupForm />);

      expect(screen.getByLabelText("이메일")).toHaveAttribute("autoComplete", "email");
    });
  });

  describe("비밀번호", () => {
    test("비밀번호 라벨과 input, 비밀번호 확인 라벨과 input이 표시된다", () => {
      render(<SignupForm />);

      expect(screen.getByText("비밀번호")).toBeInTheDocument();
      expect(screen.getByLabelText("비밀번호")).toBeInTheDocument();

      expect(screen.getByText("비밀번호 확인")).toBeInTheDocument();
      expect(screen.getByLabelText("비밀번호 확인")).toBeInTheDocument();
    });

    test("비밀번호 input과 비밀번호 확인 input은 autoComplete 속성이 new-password이다", () => {
      render(<SignupForm />);

      expect(screen.getByLabelText("비밀번호")).toHaveAttribute("autoComplete", "new-password");
      expect(screen.getByLabelText("비밀번호 확인")).toHaveAttribute(
        "autoComplete",
        "new-password"
      );
    });
  });

  describe("이름", () => {
    test("이름 라벨과 input이 표시된다", () => {
      render(<SignupForm />);

      expect(screen.getByText("이름")).toBeInTheDocument();
      expect(screen.getByLabelText("이름")).toBeInTheDocument();
    });

    test("이름 input의 autocomplete 속성은 name이다", () => {
      render(<SignupForm />);

      expect(screen.getByLabelText("이름")).toHaveAttribute("autoComplete", "name");
    });
  });

  describe("멤버타입", () => {
    test("멤버타입 라벨과 관리자와 사용자 라디오 버튼이 표시된다", () => {
      render(<SignupForm />);

      expect(screen.getByText("멤버타입")).toBeInTheDocument();
      expect(screen.getByText("관리자")).toBeInTheDocument();
      expect(screen.getByText("사용자")).toBeInTheDocument();
    });

    test("관리자 라디오 버튼을 클릭하면 관리자 라디오 버튼의 checked가 true가 된다", () => {
      render(<SignupForm />);

      const managerRadio = screen.getByRole("radio", { name: "manager" });

      userEvent.click(managerRadio, { button: 0 });

      expect(managerRadio).toBeChecked();
    });

    test("사용자 라디오 버튼을 클릭하면 사용자 라디오 버튼의 checked가 true가 된다", () => {
      render(<SignupForm />);

      const userRadio = screen.getByRole("radio", { name: "user" });

      userEvent.click(userRadio, { button: 0 });

      expect(userRadio).toBeChecked();
    });
  });

  describe("제출 버튼", () => {
    test("제출 버튼이 표시된다", () => {
      render(<SignupForm />);

      expect(screen.getByText("제출")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "submit" })).toBeInTheDocument();
    });
  });
});
