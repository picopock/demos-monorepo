import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { TEST_QUEUE } from 'src/constants/bull.constant';

const queues = [TEST_QUEUE];

@Injectable()
export class QueueValidatePipe implements PipeTransform<string, string> {
  transform(queueId: string): string {
    if (queues.includes(queueId)) {
      return queueId;
    }
    throw new BadRequestException('队列不存在');
  }
}
