type DataObject = Record<string, unknown>;

// eslint-disable-next-line import/prefer-default-export
export const pick = (obj: DataObject, properties: string[]) =>
  properties.reduce((result, prop) => ({ ...result, [prop]: obj[prop] }), {} as DataObject);
