import { Job } from 'bullmq';
import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { TEST_TEST, TEST_QUEUE } from 'src/constants/bull.constant';
import type { SendTestMsg } from '../bull/bull.interface';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

@Processor(TEST_QUEUE)
export class TestConsumer extends WorkerHost {
  private readonly queueName: string = TEST_TEST;
  constructor(
    @InjectPinoLogger(TestConsumer.name)
    private readonly logger: PinoLogger,
  ) {
    super();
  }

  async process(job: Job<SendTestMsg, any, string>) {
    switch (job.name) {
      case TEST_TEST: {
        console.log(job.data);
        return;
      }
    }
  }

  @OnWorkerEvent('active')
  onActive(job: Job) {
    this.logger.info(
      `Processing job ${job.id} of type ${job.name} with data ${JSON.stringify(job.data)}`,
    );
  }

  @OnWorkerEvent('paused')
  onPaused() {
    this.logger.info(`Queue ${this.queueName} Paused.`);
  }

  @OnWorkerEvent('resumed')
  onResumed() {
    this.logger.info(`Queue ${this.queueName} Resumed.`);
  }

  @OnWorkerEvent('completed')
  onCompleted(job: Job<SendTestMsg, any, string>) {
    this.logger.info(`Completed Job: jobId ${job.id}`);
  }

  @OnWorkerEvent('failed')
  onFailed(job: Job<SendTestMsg, any, string>, error: Error) {
    this.logger.info(`Failed Job: jobId ${job.id} \n error: ${error}`);
  }
}
