export type Optional<T extends object, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type Require<T extends object, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

export type ValuesType<T extends object> = T[keyof T];
