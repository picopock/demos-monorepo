import { Global, Module } from '@nestjs/common';
import { BullModule as NestBullModule } from '@nestjs/bullmq';
import { TEST_CONSUMER_QUEUE, TEST_QUEUE } from 'src/constants/bull.constant';
import { TestProducer } from './test.producer';
import { REDIS_BULLMQ_TOKEN } from 'src/constants/redis.constant';
import { Redis } from '../redis/redis.interface';
import { EnvConfigService } from '../config/env.config.service';

@Global()
@Module({
  providers: [TestProducer],
  exports: [TestProducer],
})
export class BullModule {
  static forRootAsync() {
    const nestBullModule = NestBullModule.forRootAsync({
      useFactory: (redis: Redis, envConfigService) => {
        return {
          prefix: envConfigService.redisKeyPrefix,
          connection: redis,
        };
      },
      inject: [REDIS_BULLMQ_TOKEN, EnvConfigService],
    });

    const nestBullRegisterQueue = NestBullModule.registerQueue(
      { name: TEST_QUEUE },
      { name: TEST_CONSUMER_QUEUE },
    );
    nestBullRegisterQueue.global = true;

    return [nestBullModule, nestBullRegisterQueue, this];
  }
}
