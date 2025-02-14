import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { isEmpty, isNull, isUndefined } from 'lodash';
import { THRID_AUTH_INFO } from 'src/constants/req.constant';
import { OpenAuthForbiddenException } from 'src/commons/exception/index.exception';

/**
 * openapi 鉴权
 */
@Injectable()
export class OpenAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const thridAuthInfo = req[THRID_AUTH_INFO];
    if (isUndefined(thridAuthInfo) || isNull(thridAuthInfo) || isEmpty(thridAuthInfo)) {
      throw new OpenAuthForbiddenException();
    }
    return true;
  }
}
