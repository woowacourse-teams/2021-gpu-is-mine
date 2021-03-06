const Storage = class {
  constructor(private storage: globalThis.Storage) {}

  get<T = string, U = never>(key: string, reviver?: (this: void, key: string, value: U) => T) {
    const savedItem = this.storage.getItem(key);

    return savedItem === null ? null : (JSON.parse(savedItem, reviver) as T);
  }

  set<T>(
    key: string,
    value: T,
    replacer?: (this: void, key: string, value: T) => unknown,
    space?: string | number
  ) {
    this.storage.setItem(key, JSON.stringify(value, replacer, space));
  }

  has(key: string) {
    return this.storage.getItem(key) !== null;
  }

  remove(key: string) {
    this.storage.removeItem(key);
  }
};

const storage = new Storage(sessionStorage);

export default storage;
