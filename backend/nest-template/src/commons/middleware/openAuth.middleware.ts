import { createDecipheriv } from 'node:crypto';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Request, Response, NextFunction } from 'express';
import { THRID_AUTH_HEADER } from 'src/constants/auth.constant';
import { EnvConfigService } from 'src/globals/config/env.config.service';
import { THRID_AUTH_INFO } from 'src/constants/req.constant';
import { AppConfigService } from 'src/globals/config/app.config.service';

export interface ThirdAuthInfo {
  appId: string;
  appName: string;
}

const patchThirdAuthInfo = (req, data: ThirdAuthInfo) => {
  Object.assign(req, { [THRID_AUTH_INFO]: data });
};

@Injectable()
export class OpenAuthMiddleware implements NestMiddleware {
  constructor(
    private readonly envConfigService: EnvConfigService,
    private readonly appConfigService: AppConfigService,
    @InjectPinoLogger(OpenAuthMiddleware.name)
    private readonly logger: PinoLogger,
  ) {}

  use(req: Request, res: Response, next: NextFunction) {
    const accessToken = req.header(THRID_AUTH_HEADER);
    if (!accessToken) {
      patchThirdAuthInfo(req, null);
      return next();
    }

    const { appSecret } = this.appConfigService;
    try {
      const decipher = createDecipheriv('aes-128-ecb', appSecret, '');
      // decipher.setAutoPadding(false)
      let result = decipher.update(accessToken, 'hex', 'utf8');
      result += decipher.final('utf8');
      const info = JSON.parse(result);
      this.logger.info('openapi decoded', info);
      patchThirdAuthInfo(req, { appId: info.appId, appName: info.appId });
      return next();
    } catch (e) {
      patchThirdAuthInfo(req, null);
      this.logger.error(`parse auth info error: ${e.message}`);
    }
    next();
  }
}
