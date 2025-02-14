import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

const operateActions = [
  'getActive',
  'getActiveCount',
  'getCompleted',
  'getCompletedCount',
  'getDelayed',
  'getDelayedCount',
  'getFailed',
  'getFailedCount',
  'getJob',
  'getJobState',
  'getJobs',
  'getJobCounts',
  'getWaiting',
  'isPaused',
];

@Injectable()
export class QueueInfoIdValidatePipe implements PipeTransform<string, string> {
  transform(action: string): string {
    if (operateActions.includes(action)) {
      return action;
    }
    throw new BadRequestException('不支持的队列操作');
  }
}
