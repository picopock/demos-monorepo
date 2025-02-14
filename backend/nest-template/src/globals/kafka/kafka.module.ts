import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KAFKA_GROUP, KAFKA_SERVICE } from 'src/constants/kafka.constant';
import { EnvConfigService } from '../config/env.config.service';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: KAFKA_SERVICE,
        useFactory: (envConfigService: EnvConfigService) => {
          const brokers = envConfigService.kafkaBrokers;
          return {
            transport: Transport.KAFKA,
            options: {
              client: {
                brokers, // Kafka 服务器地址
              },
              consumer: {
                groupId: KAFKA_GROUP, // 消费者组ID
              },
            },
          };
        },
        inject: [EnvConfigService],
      },
    ]),
  ],
})
export class KafkaModule {}
