import { emailValidator, nameValidator, passwordValidator, VALIDATION_MESSAGE } from "./validator";

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
    expect(passwordValidator("!@#$%^&*()_+1")).toBe(VALIDATION_MESSAGE.PASSWORD.ALPHABET_CHARACTER);

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
