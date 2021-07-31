import { isLength, isNumber } from "../../utils";

export const serverNameValidator = (value: string) => {
  if (!isLength(value, { min: 1, max: 15 })) {
    return `1글자 이상 15글자 이하만 가능합니다.`;
  }

  return null;
};

export const memorySizeValidator = (value: string) => {
  if (!isNumber(value, { min: 1, max: 10000 })) {
    return `1GB 이상 10,000GB 이하만 가능합니다.`;
  }

  return null;
};

export const diskSizeValidator = (value: string) => {
  if (!isNumber(value, { min: 1, max: 10000 })) {
    return `1GB 이상 10,000GB 이하만 가능합니다.`;
  }

  return null;
};

export const performanceValidator = (value: string) => {
  if (!isNumber(value, { min: 1, max: 10000 })) {
    return `1TFLOPS 이상 10,000TFLOPS 이하만 가능합니다.`;
  }

  return null;
};

export const modelNameValidator = (value: string) => {
  if (!isLength(value, { min: 1, max: 50 })) {
    return `1글자 이상 50글자 이하만 가능합니다.`;
  }

  return null;
};
