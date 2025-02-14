import { Global, Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { RedisController } from './redis.controller';
import { REDIS_BULLMQ_TOKEN, REDIS_TOKEN } from 'src/constants/redis.constant';
import { EnvConfigService } from '../config/env.config.service';
import { Redis, Cluster } from 'ioredis';

@Global()
@Module({
  controllers: [RedisController],
  providers: [
    {
      provide: REDIS_BULLMQ_TOKEN,
      useFactory: (envConfigService: EnvConfigService) => {
        const { isLocalMode, redisStandaloneConfig, redisClusterConfig } = envConfigService;
        if (isLocalMode) {
          return new Redis({
            ...redisStandaloneConfig,
            maxRetriesPerRequest: null,
            enableReadyCheck: false,
          });
        }

        return new Cluster(redisClusterConfig.nodes, {
          redisOptions: {
            ...redisClusterConfig.redisOptions,
            maxRetriesPerRequest: null,
            enableReadyCheck: false,
          },
        });
      },
      inject: [EnvConfigService],
    },
    {
      provide: REDIS_TOKEN,
      useFactory: (envConfigService: EnvConfigService) => {
        const { isLocalMode, redisKeyPrefix, redisStandaloneConfig, redisClusterConfig } =
          envConfigService;
        if (isLocalMode) {
          return new Redis({
            ...redisStandaloneConfig,
            keyPrefix: redisKeyPrefix,
            enableReadyCheck: false,
          });
        }

        return new Cluster(redisClusterConfig.nodes, {
          redisOptions: {
            ...redisClusterConfig.redisOptions,
            keyPrefix: redisKeyPrefix,
            enableReadyCheck: false,
          },
        });
      },
      inject: [EnvConfigService],
    },
    RedisService,
  ],
  exports: [REDIS_BULLMQ_TOKEN, REDIS_TOKEN, RedisService],
})
export class RedisModule {}
