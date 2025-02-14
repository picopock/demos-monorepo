import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '../http/http.module';
import { ConfigModule } from '../config/config.module';
import { I18nModule } from '../i18n/i18n.module';
import { LoggerModule } from '../logger/logger.module';
import { BullModule } from '../bull/bull.module';
import { OpenAuthMiddleware } from 'src/commons/middleware/openAuth.middleware';
import { PrismaModule } from '../prisma/prisma.module';
import { RedisModule } from '../redis/redis.module';
import { HealthModule } from 'src/apis/health/health.module';
import { TestModule } from 'src/apis/test/test.module';
import { QueueModule } from 'src/apis/queue/queue.module';

@Module({
  imports: [
    ConfigModule,
    LoggerModule.forRootAsync(),
    RedisModule,
    HttpModule,
    I18nModule,
    PrismaModule,
    ...BullModule.forRootAsync(),
    EventEmitterModule.forRoot(),
    HealthModule,
    QueueModule,
    TestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // 开放平台权限中间件
    consumer.apply(OpenAuthMiddleware).forRoutes({
      path: '*/open/*',
      method: RequestMethod.ALL,
    });
  }
}
