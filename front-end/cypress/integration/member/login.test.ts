describe("login", () => {
  const setup = () => {
    cy.intercept("POST", "login").as("postLogin");

    cy.visit("/member/login", {
      onBeforeLoad(window) {
        window.sessionStorage.clear();
      },
    });
  };

  const login = () => {
    cy.findByRole("textbox", { name: /이메일/i }).type("test@test.com");
    cy.findByLabelText(/비밀번호/i).type("test1234!");
    cy.findByRole("button", { name: /로그인/i }).click();

    cy.wait("@postLogin");

    cy.findByRole("button", { name: /로그아웃/i }).should("be.visible");
  };

  it("이메일, 비밀번호를 입력하면 로그인이 된다", () => {
    setup();
    login();
  });

  it("로그인 후 새로고침을 하여도 로그인이 지속된다", () => {
    setup();
    login();

    cy.reload();
    cy.findByRole("button", { name: /로그아웃/i }).should("be.visible");
  });
});
