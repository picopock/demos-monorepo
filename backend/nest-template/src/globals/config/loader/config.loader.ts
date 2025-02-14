import { resolve } from 'path';
import { registerAs } from '@nestjs/config';
import { existsSync, readdirSync } from 'fs';
import { loadYamlSync } from 'src/utils';
import { checkConfigDir, loadBaseEnvConf, log } from './util';
import { merge } from 'lodash';

const configLoaderFactory = () => {
  const configDir = checkConfigDir();

  const files = readdirSync(configDir);
  const configNames: string[] = files
    .filter((file) => file.endsWith('.yaml'))
    .map((file) => {
      const configName = (file || '').split('.');
      return configName[0] || '';
    })
    .reduce((ret, configName) => {
      if (!configName || ret.includes(configName)) {
        return ret;
      }
      return [...ret, configName];
    }, [])
    .filter((configName) => configName !== 'env');
  const { NODE_ENV: curEnv } = loadBaseEnvConf();
  if (configNames.length === 0) {
    return [];
  }
  log(`env: ${curEnv}`);
  return configNames
    .map((configName) => {
      const needLoadEnvs = ['', curEnv]; // 当前环境配置文件和基础配置文件
      const configPaths = needLoadEnvs
        .map((env) => {
          const fileName = env ? `${configName}.${env}.yaml` : `${configName}.yaml`;
          const absolutePath = resolve(configDir, fileName);
          return absolutePath;
        })
        .filter((absolutePath) => existsSync(absolutePath));

      if (configPaths.length === 0) {
        return null;
      }
      return registerAs(configName, () => {
        const config = configPaths
          .map((path) => {
            return loadYamlSync(path);
          })
          .reduce((result, conf) => {
            return merge(result, conf);
          }, {});
        log(`load ${configName} config success!`);
        return config;
      });
    })
    .filter((register) => !!register);
};

export default configLoaderFactory;
