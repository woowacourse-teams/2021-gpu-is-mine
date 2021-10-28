import { dockerHubImageValidator, jobNameValidator } from "./validator";

describe("JobRegisterForm Validator", () => {
  describe("jobName Validator", () => {
    test("공백문자만 등록할 수 없다", () => {
      expect(jobNameValidator("  ")).toBe("Job이름으로 공백문자를 등록할 수 없습니다");
    });

    const min = 1;
    const max = 30;

    test.each(["테스트", "123456789가나다라마바사아자차카타파하동동동30글자"])(
      `${min} 글자 이상 ${max} 글자 이하만 가능하다`,
      (jobName) => {
        expect(jobNameValidator(jobName)).toBeNull();
      }
    );

    test.each(["", "123456789가나다라마바사아자차카타파하동동동30글자초과"])(
      `${min} 글자 이상 ${max} 글자 이하만 가능하다`,
      (jobName) => {
        const lengthValidationMessage = `${min}글자 이상 ${max}글자 이하만 가능합니다.`;

        expect(jobNameValidator(jobName)).toBe(lengthValidationMessage);
      }
    );
  });

  describe("Docker Hub Image Validator", () => {
    const validationMessage = "계정명/저장소명:버전을 기입해주세요";

    test.each(["", "abc:def", "a/b/c", "ubuntu"])(
      "계정명/저장소명[:태그명]에 해당하지 않으면 validationMessage를 반환한다",
      (image) => {
        expect(dockerHubImageValidator(image)).toBe(validationMessage);
      }
    );

    test("계정명이 생략되면 invalid하다", () => {
      expect(dockerHubImageValidator("python:latest")).toBe(validationMessage);
    });

    test("태그가 없는 계정명/저장소명 은 valid하다", () => {
      expect(dockerHubImageValidator("aprn7950/mnist_test_auto")).toBeNull();
    });

    test.each([
      "aprn7950/mnist_test_auto:latest",
      "aprn7950/mnist_test_auto:v14.0",
      "aprn7950/mnist_test_auto:enterprise-7.0.2",
      "r-base/alpine:3.11.0a1-alpine3.14",
    ])("계정명/저장소명:태그명 은 valid하다", (image) => {
      expect(dockerHubImageValidator(image)).toBeNull();
    });
  });
});
