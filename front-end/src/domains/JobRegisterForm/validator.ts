import { isLength, isNumber } from "../../utils";

export const jobNameValidator = (value: string) => {
  const min = 1;
  const max = 30;

  if (!isLength(value, { min, max })) {
    return `${min}글자 이상 ${max}글자 이하만 가능합니다.`;
  }

  return null;
};

export const expectedTimeValidator = (value: string) => {
  const min = 0;
  const max = 10_000;

  if (!isNumber(value, { min, max })) {
    return `${min} 시간 이상 ${max} 시간 이하만 가능합니다.`;
  }

  return null;
};

export const minPerformanceValidator = (value: string) => {
  const min = 0;
  const max = 100_000;

  if (!isNumber(value, { min, max })) {
    return `${min} TFLOPS 이상 ${max} TFLOPS 이하만 가능합니다.`;
  }

  return null;
};
