export const storageKeys = {
  user: '@user',
};

export type StorageKeys = keyof typeof storageKeys;

export const rootKeys = {...storageKeys};
