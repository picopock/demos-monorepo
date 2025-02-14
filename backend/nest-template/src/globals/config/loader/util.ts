import { existsSync, statSync } from 'fs';
import { partial } from 'lodash';
import { join, resolve } from 'path';
import { loadYamlSync } from 'src/utils';

export const logPrefix = '[config loader]';

export const log = partial(console.log, logPrefix);

export const getConfigDir = () => {
  return join(process.cwd(), 'config');
};

export const checkConfigDir = (): string => {
  const configDir = getConfigDir();
  if (!existsSync(configDir)) {
    throw new Error(`${logPrefix} config dir ${configDir} not exists!`);
  }

  const stats = statSync(configDir);
  if (!stats.isDirectory()) {
    throw new Error(`${logPrefix} config dir ${configDir} is not a directory!`);
  }
  return configDir;
};

export const loadBaseEnvConf = (() => {
  const baseEnvFileName = 'env.yaml';
  const envFilePath = resolve(checkConfigDir(), baseEnvFileName);

  let isLoaded = false;
  let baseConf = null;

  return () => {
    if (isLoaded && baseConf) {
      return baseConf;
    }
    baseConf = loadYamlSync(envFilePath);
    isLoaded = true;
    return baseConf;
  };
})();
