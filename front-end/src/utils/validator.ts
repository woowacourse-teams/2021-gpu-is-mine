interface ValidatorOption {
  min?: number;
  max?: number;
}

export const isNumber = (
  value: string,
  { min = Number.MIN_VALUE, max = Number.MAX_VALUE }: ValidatorOption
) => !Number.isNaN(Number(value)) && min <= Number(value) && Number(value) <= max;

export const isLength = (
  value: string,
  { min = 0, max = Number.MAX_SAFE_INTEGER }: ValidatorOption
) => min <= value.length && value.length <= max;
