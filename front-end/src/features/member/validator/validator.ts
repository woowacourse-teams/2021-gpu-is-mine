import { isEmail, isLength } from "../../../utils";

export const VALIDATION_MESSAGE = {
  EMAIL: "형식에 맞지 않은 이메일입니다",
  PASSWORD: {
    LENGTH: "8자 이상 32자 이하로 입력해주세요",
    SPECIAL_CHARACTER: `하나 이상의 특수문자(~!@#$%^&*()-_=+[{]}\\|;:'",<.>/?)가 포함되어야 합니다`,
    NUMBER_CHARACTER: `하나 이상의 숫자가 포함되어야 합니다`,
    ALPHABET_CHARACTER: `하나 이상의 영문자가 포함되어야 합니다`,
    INVALID_CHARACTER: `지정된 특수문자(~!@#$%^&*()-_=+[{]}\\|;:'",<.>/?)만 입력해주세요`,
  },
  PASSWORD_CONFIRM: "비밀번호와 동일한 값을 입력해주세요",
  NAME: "2자 이상 15자 이하로 입력해주세요",
} as const;

export const emailValidator = (value: string) => (isEmail(value) ? "" : VALIDATION_MESSAGE.EMAIL);

export const passwordValidator = (value: string) => {
  if (!isLength(value, { min: 8, max: 32 })) {
    return VALIDATION_MESSAGE.PASSWORD.LENGTH;
  }

  const specialCharacterRegex = /[~!@#$%^&*()\-_=+[{\]}\\|;:'",<.>/?]/;

  if (!specialCharacterRegex.test(value)) {
    return VALIDATION_MESSAGE.PASSWORD.SPECIAL_CHARACTER;
  }

  const numberRegex = /[\d]/;

  if (!numberRegex.test(value)) {
    return VALIDATION_MESSAGE.PASSWORD.NUMBER_CHARACTER;
  }

  const alphabetRegex = /[a-z]/i;

  if (!alphabetRegex.test(value)) {
    return VALIDATION_MESSAGE.PASSWORD.ALPHABET_CHARACTER;
  }

  if (
    value
      .replace(new RegExp(specialCharacterRegex, "g"), "")
      .replace(new RegExp(numberRegex, "g"), "")
      .replace(new RegExp(alphabetRegex, "g"), "") !== ""
  ) {
    return VALIDATION_MESSAGE.PASSWORD.INVALID_CHARACTER;
  }

  return "";
};

export const passwordConfirmValidator = (value: string, password: string) =>
  value === password ? "" : VALIDATION_MESSAGE.PASSWORD_CONFIRM;

export const nameValidator = (value: string) => {
  if (!isLength(value, { min: 2, max: 15 })) {
    return VALIDATION_MESSAGE.NAME;
  }

  return "";
};
