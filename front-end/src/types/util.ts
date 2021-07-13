export type Optional<T extends Record<string | symbol, unknown>, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>;
