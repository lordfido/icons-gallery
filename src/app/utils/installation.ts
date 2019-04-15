import { v1 as uuid } from 'uuid';
import { getLocalStorage, setLocalStorage } from '../../common/utils/localStorage';
import { log } from '../../common/utils/logger';

import { INSTALLATION_ID } from '../../constants/localStorage';

/**
 * Get Installation ID
 */
const getInstallationId = () => {
  const installationId = getLocalStorage(INSTALLATION_ID);

  log(`Current InstallationId: ${installationId}`);
  return installationId;
};

/**
 * If no installation ID available, create it
 */
const setInstallationId = (override: boolean = false) => {
  if (!getInstallationId() || override) {
    const value = uuid();
    log(`Setting InstallationID: <${value}>`);

    setLocalStorage(INSTALLATION_ID, value);
  }
};

/**
 * Set installation data:
 * - Installation id
 */
export const setInstallationData = () => {
  setInstallationId();
};

export interface IInstallationData {
  installationId: string | null | undefined;
}

/**
 * Get installation data:
 * - Installation id
 */
export const getInstallationData = () => {
  const data: IInstallationData = {
    installationId: getInstallationId(),
  };

  return data;
};
