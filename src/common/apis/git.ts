import { config } from 'dotenv';
import { Clone, CloneOptions, Cred, Repository } from 'nodegit';
import { homedir } from 'os';
import { join } from 'path';
import rimraf from 'rimraf';
import { error, info } from '../utils/logger';

config();

const LOCAL_PATH = join(__dirname, '../src/images/icons/');
const { REPO_PASSPHRASE = '', REPO_PRIVATE_PATH = '', REPO_PUBLIC_PATH = '', REPO_URL = '' } = process.env;

class GitApi {
  private cloneOptions: CloneOptions;
  private privateKey: string;
  private publicKey: string;
  private passphraseKey: string;
  private repository: string;

  constructor() {
    const PRIVATE_KEY_PATH = join(homedir(), REPO_PRIVATE_PATH);
    const PUBLIC_KEY_PATH = join(homedir(), REPO_PUBLIC_PATH);

    this.cloneOptions = {
      fetchOpts: {
        callbacks: {
          credentials: (url: string, userName: string) =>
            Cred.sshKeyNew(userName, this.publicKey, this.privateKey, this.passphraseKey),
        },
      },
    };
    this.privateKey = PRIVATE_KEY_PATH;
    this.publicKey = PUBLIC_KEY_PATH;
    this.passphraseKey = REPO_PASSPHRASE;
    this.repository = REPO_URL;
  }

  public clone = () => {
    rimraf.sync(LOCAL_PATH);

    return Clone.clone(this.repository, LOCAL_PATH, this.cloneOptions)
      .then(repo => {
        info('Repository has been downloaded');
        return repo;
      })
      .catch((err: any) => {
        error('Got an error trying to access the repo', err);
      });
  };

  public pull = () =>
    Repository.open(LOCAL_PATH)
      .then(repo => repo.fetchAll(this.cloneOptions.fetchOpts).then(() => repo))
      .then(repo => repo.mergeBranches('master', 'origin/master').then(() => repo))
      .then(repo => {
        info('Repository has been updated');
        return repo;
      });
}

export default GitApi;
