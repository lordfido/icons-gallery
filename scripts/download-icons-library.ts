import { config } from 'dotenv';
import { Clone, CloneOptions, Cred } from 'nodegit';
import { homedir } from 'os';
import { join } from 'path';
import rimraf from 'rimraf';

import { error, info } from '../src/common/utils/logger';

config();

const LOCAL_PATH = join(__dirname, '../src/images/icons/');
const { REPO_PASSPHRASE, REPO_PRIVATE_PATH, REPO_PUBLIC_PATH, REPO_URL } = process.env;

if (
  typeof REPO_PASSPHRASE !== 'undefined' &&
  typeof REPO_PRIVATE_PATH !== 'undefined' &&
  typeof REPO_PUBLIC_PATH !== 'undefined' &&
  typeof REPO_URL !== 'undefined'
) {
  rimraf.sync(LOCAL_PATH);

  const PUBLIC_KEY_PATH = join(homedir(), REPO_PUBLIC_PATH);
  const PRIVATE_KEY_PATH = join(homedir(), REPO_PRIVATE_PATH);

  const getSshKey = (userName: string) => Cred.sshKeyNew(userName, PUBLIC_KEY_PATH, PRIVATE_KEY_PATH, REPO_PASSPHRASE);

  const cloneOptions: CloneOptions = {
    fetchOpts: {
      callbacks: {
        credentials: (url: string, userName: string) => getSshKey(userName),
      },
    },
  };

  Clone.clone(REPO_URL, LOCAL_PATH, cloneOptions)
    .then(() => {
      info('Repository has been downloaded');
    })
    .catch((err: any) => {
      error('Got an error trying to access the repo', err);
    });
} else {
  error('There is some value missing in your Enviroment values. Please, check the Readme.md');
}
