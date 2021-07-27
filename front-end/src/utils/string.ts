export const padLeft = (length: number, prefix: string) => (value: string) => {
  return value.padStart(length, prefix);
};
