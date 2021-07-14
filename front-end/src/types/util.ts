// eslint-disable-next-line @typescript-eslint/ban-types
export type Optional<T extends object, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
