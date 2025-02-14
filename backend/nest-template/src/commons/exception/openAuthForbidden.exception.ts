import { ForbiddenException } from '@nestjs/common';

export class OpenAuthForbiddenException extends ForbiddenException {
  constructor(msg = '您没有访问权限！') {
    super(`${msg}`);
  }
}
