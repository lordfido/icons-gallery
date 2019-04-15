import { LocalStorageKey } from '../../constants/localStorage';

/**
 * Get the value of a localStorage
 */
export const getLocalStorage = (keyName: LocalStorageKey) => {
  try {
    const item = window.localStorage.getItem(keyName);

    return item;
  } catch {
    return undefined;
  }
};

/**
 * Set the value of a localStorage
 */
export const setLocalStorage = (keyName: LocalStorageKey, value: string) => {
  try {
    const item = window.localStorage.setItem(keyName, value);

    return item;
  } catch {
    return undefined;
  }
};
