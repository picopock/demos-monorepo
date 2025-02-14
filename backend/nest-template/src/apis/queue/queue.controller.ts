import { InjectQueue } from '@nestjs/bullmq';
import { Body, Controller, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { Queue } from 'bullmq';
import { TEST_QUEUE } from 'src/constants/bull.constant';
import { QueueValidatePipe } from './queueValidate.pipe';
import { QueueInfoIdValidatePipe } from './queueInfoIdValidate.pipe';
import { OperateActionValidatePipe } from './operateActionValidate.pipe';
import { BullMQGuard } from 'src/commons/guard/index.guard';

@Controller('queue')
@UseGuards(BullMQGuard)
export class QueueController {
  constructor(@InjectQueue(TEST_QUEUE) private readonly testQueue: Queue) {}

  @HttpCode(HttpStatus.OK)
  @Post(':queueId/info/:infoId')
  async info(
    @Param('queueId', QueueValidatePipe) queueId: string,
    @Param('infoId', QueueInfoIdValidatePipe) infoId: string,
    @Body() params: unknown[] = [],
  ) {
    const queue = this[`${queueId}Queue`];
    const handler = queue[infoId];
    if (handler) {
      return handler.apply(queue, params.slice(0, -1));
    }
    return `获取 ${queueId} 队列 ${infoId} 信息异常`;
  }

  @HttpCode(HttpStatus.OK)
  @Post(':queueId/operation/:action')
  async operation(
    @Param('queueId', QueueValidatePipe) queueId: string,
    @Param('action', OperateActionValidatePipe) action: string,
    @Body() params: unknown[] = [],
  ) {
    const queue = this[`${queueId}Queue`];
    const handler = queue[action];
    if (handler) {
      return handler.apply(queue, params.slice(0, -1));
    }
    return `${queueId} 队列 ${action} 操作异常`;
  }
}
