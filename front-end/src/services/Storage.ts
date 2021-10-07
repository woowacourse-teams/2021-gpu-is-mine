class Storage {
  constructor(private storage: globalThis.Storage) {}

  get<T>(key: string) {
    const savedItem = this.storage.getItem(key);

    return savedItem === null ? null : (JSON.parse(savedItem) as T);
  }

  set(key: string, value: unknown) {
    this.storage.setItem(key, JSON.stringify(value));
  }

  has(key: string) {
    return this.storage.getItem(key) !== null;
  }
}

const storage = new Storage(sessionStorage);

export default storage;
