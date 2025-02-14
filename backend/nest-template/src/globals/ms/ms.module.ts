import { Module } from '@nestjs/common';
import { HttpModule } from '../http/http.module';
import { ConfigModule } from '../config/config.module';
import { I18nModule } from '../i18n/i18n.module';
import { LoggerModule } from '../logger/logger.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { KafkaModule } from '../kafka/kafka.module';
import { BullMSModule } from '../bullMS/bullMS.module';
import { PrismaModule } from '../prisma/prisma.module';
import { RedisModule } from '../redis/redis.module';

@Module({
  imports: [
    ConfigModule,
    LoggerModule.forRootAsync(),
    RedisModule,
    HttpModule,
    I18nModule,
    PrismaModule,
    KafkaModule,
    ...BullMSModule.forRootAsync(),
    EventEmitterModule.forRoot(),
  ],
})
export class MSModule {}
