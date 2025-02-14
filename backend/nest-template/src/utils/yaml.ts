import { readFileSync, existsSync } from 'fs';
import { resolve, isAbsolute } from 'path';
import { load } from 'js-yaml';

export const loadYamlSync = (pathOrFilename: string) => {
  if (!pathOrFilename) return {};
  const absolutePath = isAbsolute(pathOrFilename)
    ? pathOrFilename
    : resolve(__dirname, pathOrFilename);
  let config = {};
  try {
    if (!existsSync(absolutePath)) {
      throw new Error(`[yaml loader] file ${absolutePath} not exists!`);
    }
    config = load(readFileSync(absolutePath, 'utf8'));
  } catch (err) {
    console.error(`[yaml loader] load file ${absolutePath} error ! ${err}`);
  }
  return config;
};

export const loadYamlSyncAndMerge = (pathOrFilenames: string[]) => {
  const configs = pathOrFilenames.map(loadYamlSync);
  return configs.reduce((result, conf) => {
    return { ...result, ...conf };
  }, {});
};
