import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { JobsOptions, Queue } from 'bullmq';
import { TestConsumerActionData } from './bullMS.interface';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { TEST_CONSUMER_ACTION, TEST_CONSUMER_QUEUE } from 'src/constants/bull.constant';

const transferOpts = {
  attempts: 5,
  backoff: {
    type: 'exponential',
    delay: 2 * 1000, // 2s
  },
};

@Injectable()
export class TestProducer {
  constructor(
    @InjectPinoLogger(TestProducer.name)
    private readonly logger: PinoLogger,
    @InjectQueue(TEST_CONSUMER_QUEUE)
    private readonly testConsumerQueue: Queue,
  ) {}

  async sendToTestConsumerQueue(data: TestConsumerActionData, opts: JobsOptions = {}) {
    this.logger.info(`testConsumerQueue data: ${JSON.stringify(data)}`);
    return this.testConsumerQueue.add(TEST_CONSUMER_ACTION, data, {
      ...transferOpts,
      ...opts,
    });
  }
}
