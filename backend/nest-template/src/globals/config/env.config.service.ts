import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { isNumber, isUndefined, toNumber } from 'lodash';
import { NodeEnv, safeJSONParse } from 'src/utils';
import type {
  EnvConfig,
  Http,
  Kafka,
  Mysql,
  RedisClusterConfig,
  RedisStandaloneConfig,
} from './env.config.interface';
import type { ClusterNode } from 'ioredis';
import { REDIS_KEY_PREFIX } from 'src/constants/redis.constant';

const logPrefix = '[EnvService] ';

@Injectable()
export class EnvConfigService {
  private readonly prefix: string = 'env';

  constructor(private configService: NestConfigService) {}

  get<T = any>(path?: string): T {
    const prefixedPath = path ? `${this.prefix}.${path}` : this.prefix;
    return this.configService.get<T>(prefixedPath);
  }

  private str2Num(data: string | number, defaultValue?: number): number | undefined {
    if (isNumber(data)) {
      return data;
    }
    let ret = defaultValue;
    try {
      ret = toNumber(data);
    } catch (err) {
      console.error(logPrefix, `parse number error: ${err}`);
    }
    return ret;
  }

  get nodeEnv(): NodeEnv {
    return this.get<NodeEnv>('NODE_ENV');
  }

  get isLocalMode(): boolean {
    return this.nodeEnv === NodeEnv.Local;
  }

  get isDevMode(): boolean {
    return this.nodeEnv === NodeEnv.Development;
  }

  get isTestMode(): boolean {
    return this.nodeEnv === NodeEnv.Test;
  }

  get isProdMode(): boolean {
    return this.nodeEnv === NodeEnv.Production;
  }

  get HTTPPort(): number {
    const maybePort = this.get<number | string>('HTTP_PORT');
    return this.str2Num(maybePort, 3000);
  }

  get httpConfig(): Http {
    return {
      port: this.HTTPPort,
    };
  }

  get databaseUrl(): string {
    return this.get<string>('DATABASE_URL');
  }

  get mysqlConfig(): Mysql {
    return {
      url: this.databaseUrl,
    };
  }

  get redisHost(): string {
    return this.get<string>('REDIS_STANDALONE_HOST');
  }

  get redisPort(): number {
    const maybePort = this.get<number>('REDIS_STANDALONE_PORT');
    return this.str2Num(maybePort, 6379);
  }

  get redisPassword(): string {
    return this.get<string>('REDIS_STANDALONE_PASS');
  }

  get redisDb(): number {
    const maybeDb = this.get<number>('REDIS_STANDALONE_DB');
    if (isUndefined(maybeDb)) return maybeDb;
    return this.str2Num(maybeDb);
  }

  get redisKeyPrefix(): string {
    return `{${this.nodeEnv}_${REDIS_KEY_PREFIX}}`;
  }

  get redisStandaloneConfig(): RedisStandaloneConfig {
    return {
      host: this.redisHost,
      port: this.redisPort,
      password: this.redisPassword,
      db: this.redisDb,
    };
  }

  get redisClusterNodes(): ClusterNode[] {
    const nodeStr = this.get('REDIS_CLUSTER_NODES');
    const nodes = safeJSONParse<{ HOST: string; PORT: number }[]>(nodeStr, []).map((item) => {
      return {
        host: item.HOST,
        port: +item.PORT,
      };
    });
    return nodes;
  }

  get redisClusterPassword() {
    return this.get<string>('REDIS_CLUSTER_PASS');
  }

  get redisClusterDb() {
    const maybeDb = this.get<number>('REDIS_CLUSTER_DB');
    if (isUndefined(maybeDb)) return maybeDb;
    return this.str2Num(maybeDb);
  }

  get redisClusterConfig(): RedisClusterConfig {
    return {
      nodes: this.redisClusterNodes,
      redisOptions: {
        password: this.redisClusterPassword,
        db: this.redisClusterDb,
      },
    };
  }

  get redisConfig() {
    return this.isLocalMode ? this.redisStandaloneConfig : this.redisClusterConfig;
  }

  get kafkaHost(): string {
    return this.get<string>('KAFKA_HOST');
  }

  get kafkaPort(): number {
    const maybePort = this.get<number>('KAFKA_PORT');
    return this.str2Num(maybePort, 9092);
  }

  get kafkaBrokers(): string[] {
    return [`${this.kafkaHost}:${this.kafkaPort}`];
  }

  get kafkaConfig(): Kafka {
    return {
      host: this.kafkaHost,
      port: this.kafkaPort,
    };
  }

  get envConfig(): EnvConfig {
    return {
      NODE_ENV: this.nodeEnv,
      http: this.httpConfig,
      mysql: this.mysqlConfig,
      redis: this.redisConfig,
      kafka: this.kafkaConfig,
    };
  }
}
