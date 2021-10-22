describe("signup", () => {
  const setup = () => {
    cy.intercept("POST", "members").as("postSignup");
    cy.intercept("POST", "login").as("postLogin");

    cy.visit("/", {
      onBeforeLoad(window) {
        window.sessionStorage.clear();
      },
    });
  };

  const email = `test${Date.now()}@test.com`;
  const password = "test1234!";
  const name = "동동";

  const signup = () => {
    // 이메일, 비밀번호, 이름을 입력한다
    cy.findByRole("textbox", { name: /이메일/i }).type(email);
    cy.findByLabelText(/^비밀번호$/i).type(password);
    cy.findByLabelText(/비밀번호 확인/i).type(password);
    cy.findByRole("textbox", { name: /이름/i }).type(name);

    // 회원가입 버튼을 클릭한다
    cy.findByRole("button", { name: /submit/i }).click();

    // 회원가입 API Call 의 response 를 기다린다
    cy.wait("@postSignup");

    // 회원가입이 성공하였다는 알럿 창의 확인 버튼을 클릭한다
    cy.findByRole("button", { name: /확인/i }).click();

    // 로그인 페이지가 표시되는 것을 확인한다
    cy.findByRole("button", { name: /로그인/i }).should("be.visible");
  };

  const login = () => {
    // 이메일, 비밀번호를 입력한다
    cy.findByRole("textbox", { name: /이메일/i }).type(email);
    cy.findByLabelText(/비밀번호/i).type(password);

    // 로그인 버튼을 클릭한다
    cy.findByRole("button", { name: /로그인/i }).click();

    // 로그인 API Call 의 response 를 기다린다
    cy.wait("@postLogin");

    // 메인페이지가 표시되는 것을 확인한다
    cy.findByRole("button", { name: /로그아웃/i }).should("be.visible");
  };

  it("이메일, 비밀번호, 이름을 입력하여 회원가입을 한다", () => {
    setup();

    cy.findByText(/아직 회원이 아니신가요\?/i).click();

    signup();
  });

  it("회원가입한 이메일 과 비밀번호로 로그인을 할 수 있다", () => {
    setup();

    login();
  });
});
