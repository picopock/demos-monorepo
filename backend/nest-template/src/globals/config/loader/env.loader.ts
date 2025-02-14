import { existsSync } from 'fs';
import { resolve } from 'path';
import { merge } from 'lodash';
import { loadYamlSync } from 'src/utils';
import { registerAs } from '@nestjs/config';
import { checkConfigDir, loadBaseEnvConf, log } from './util';
import type { ConfigObject } from '@nestjs/config';

const configPrefix = 'env';

export interface Env extends ConfigObject {
  NODE_ENV: string;
}

const envLoader = registerAs<Env>(configPrefix, () => {
  const configDir = checkConfigDir();
  const baseEnvConf = loadBaseEnvConf();
  const { NODE_ENV } = baseEnvConf as Record<string, string>;
  // 当前环境配置文件
  const curEnvConfPath = resolve(configDir, `${configPrefix}.${NODE_ENV}.yaml`);
  let curEnvConf = {};
  if (existsSync(curEnvConfPath)) {
    curEnvConf = loadYamlSync(curEnvConfPath);
  }

  log(`load ${configPrefix} config success!`);
  const config = merge(process.env, baseEnvConf, curEnvConf, { NODE_ENV }) as Env;
  return config;
});

export default envLoader;
