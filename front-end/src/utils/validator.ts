interface ValidatorOption {
  min?: number;
  max?: number;
}

export const isNumber = (
  value: string,
  { min = Number.MIN_VALUE, max = Number.MAX_VALUE }: ValidatorOption
) => !Number.isNaN(Number(value)) && value !== "" && min <= Number(value) && Number(value) <= max;

export const isLength = (
  value: string,
  { min = 0, max = Number.MAX_SAFE_INTEGER }: ValidatorOption
) => min <= value.length && value.length <= max;

export const isEmail = (value: string) => {
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return emailRegex.test(value);
};
