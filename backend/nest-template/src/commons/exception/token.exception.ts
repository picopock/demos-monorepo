import { HttpException, HttpStatus } from '@nestjs/common';

export class TokenException extends HttpException {
  constructor(msg = '获取 Token 异常！') {
    super(`TokenError: ${msg}`, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
