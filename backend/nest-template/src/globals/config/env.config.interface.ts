import { ClusterNode, ClusterOptions, RedisOptions } from 'ioredis';
import { NodeEnv } from 'src/utils';

export interface EnvConfig {
  NODE_ENV: NodeEnv;
  http: Http;
  mysql: Mysql;
  redis: RedisOptions | RedisClusterConfig;
  kafka: Kafka;
}

export interface Http {
  port: number;
}

export interface Mysql {
  url: string;
}

export interface Kafka {
  host: string;
  port: number;
}

export interface RedisStandaloneConfig {
  host: string;
  port: number;
  password: string;
  db?: number;
  keyPrefix?: string;
}

export interface RedisClusterConfig {
  nodes: ClusterNode[];
  redisOptions: ClusterOptions['redisOptions'];
}
