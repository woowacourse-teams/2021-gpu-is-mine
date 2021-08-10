type DataObject = Record<string, unknown>;

// eslint-disable-next-line import/prefer-default-export
export const pick = (obj: DataObject, properties: string[]) =>
  properties.reduce((result, prop) => {
    // eslint-disable-next-line no-param-reassign
    result[prop] = obj[prop];
    return result;
  }, {} as DataObject);
