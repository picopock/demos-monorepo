import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { isArray } from 'lodash';
import { Observable } from 'rxjs';
import { BullMQForbiddenException } from 'src/commons/exception/index.exception';
import { AppConfigService } from 'src/globals/config/app.config.service';

@Injectable()
export class BullMQGuard implements CanActivate {
  constructor(private readonly appConfigService: AppConfigService) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const {
      bullMQConfig: { codeWord },
    } = this.appConfigService;

    const request = context.switchToHttp().getRequest();
    const body = request.body || [];
    if (!isArray(request.body) || body.length === 0 || body[body.length - 1] !== codeWord) {
      throw new BullMQForbiddenException();
    }
    return true;
  }
}
