const STORAGE_KEY_PREFIX = "E_CO_";

const makeStorageKey = (key: string) => `${STORAGE_KEY_PREFIX}${key}`;

export const STORAGE_ACCESS_TOKEN_KEY = makeStorageKey("ACCESS_TOKEN");
export const STORAGE_REFRESH_TOKEN_KEY = makeStorageKey("REFRESH_TOKEN");

export const STORAGE_ME_KEY = makeStorageKey("ME");
