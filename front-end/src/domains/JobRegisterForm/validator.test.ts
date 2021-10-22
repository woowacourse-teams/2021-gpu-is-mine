import { dockerHubImageValidator } from "./validator";

describe("JobRegisterForm Validator", () => {
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
