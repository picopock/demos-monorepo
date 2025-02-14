import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { BulkJobOptions, JobsOptions, Queue } from 'bullmq';
import { TEST_CONSUMER_ACTION, TEST_CONSUMER_QUEUE } from 'src/constants/bull.constant';
import { SendTestMsg } from './bull.interface';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

const testOpts = {
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
    private readonly testQueue: Queue,
  ) {}

  async sendTestMsg(data: SendTestMsg, opts: JobsOptions = {}) {
    this.logger.info(`sendTestMsg data: ${JSON.stringify(data)}`);
    return this.testQueue.add(TEST_CONSUMER_ACTION, data, { ...testOpts, ...opts });
  }

  async blukSendTestMsg(data: SendTestMsg[], opts?: BulkJobOptions) {
    this.logger.info(`blukSendTestMsg data: ${JSON.stringify(data)}`);
    const jobs = data.map((d) => ({
      name: TEST_CONSUMER_ACTION,
      data: d,
      opts: { ...testOpts, ...opts },
    }));
    return this.testQueue.addBulk(jobs);
  }
}
