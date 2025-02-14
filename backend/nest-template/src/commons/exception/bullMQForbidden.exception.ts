import { ForbiddenException } from '@nestjs/common';

export class BullMQForbiddenException extends ForbiddenException {
  constructor(msg = '您没有访问消息队列的权限(*￣︶￣)！') {
    super(`${msg}`);
  }
}
