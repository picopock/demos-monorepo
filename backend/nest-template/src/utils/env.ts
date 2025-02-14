/**
 * 慎用：请从 EnvConfigService 获取
 */
export enum NodeEnv {
  Local = 'local',
  Development = 'development',
  Test = 'test',
  Production = 'production',
}

export const getNodeEnv = () => {
  return process.env.NODE_ENV || NodeEnv.Local;
};

export const isLocal = () => {
  const nodeEnv = getNodeEnv();
  return nodeEnv === NodeEnv.Local;
};

export const isDev = () => {
  const nodeEnv = getNodeEnv();
  return nodeEnv === NodeEnv.Development;
};

export const isTest = () => {
  const nodeEnv = getNodeEnv();
  return nodeEnv === NodeEnv.Test;
};

export const isProd = () => {
  const nodeEnv = getNodeEnv();
  return nodeEnv === NodeEnv.Production;
};
