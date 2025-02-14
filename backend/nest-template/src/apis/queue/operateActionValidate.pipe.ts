import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

const operateActions = ['pause', 'resume', 'retryJobs', 'clean'];

@Injectable()
export class OperateActionValidatePipe implements PipeTransform<string, string> {
  transform(action: string): string {
    if (operateActions.includes(action)) {
      return action;
    }
    throw new BadRequestException('不支持的队列操作');
  }
}
