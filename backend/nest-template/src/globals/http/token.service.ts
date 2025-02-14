import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AppConfigService } from '../config/app.config.service';
import { TokenException } from 'src/commons/exception/index.exception';
import { urlMap } from './urlMap.config';
import { lastValueFrom } from 'rxjs';
import { HttpService } from './http.service';

@Injectable()
export class TokenService {
  private token: string = '';
  private expire: number = 0;
  private readonly ttl: number = 10 * 60 * 1000; // 10 min

  constructor(
    private readonly appConfigService: AppConfigService,
    @InjectPinoLogger(TokenService.name)
    private readonly logger: PinoLogger,
    @Inject(forwardRef(() => HttpService))
    private readonly httpService: HttpService,
  ) {
    this.ttl = this.appConfigService.tokenTtl;
  }

  async getToken() {
    if (Date.now() > this.expire) {
      this.token = await this.getTokenFromServer();
      this.expire = Date.now() + this.ttl;
    }
    return this.token;
  }

  async getTokenFromServer() {
    const { appId, appSecret, baseUrl } = this.appConfigService;
    const res = await lastValueFrom(
      this.httpService.post<{ code: number; data: string; message: string }>(
        urlMap.accessToken,
        {
          appId,
          appSecret,
        },
        {
          baseURL: baseUrl,
        },
      ),
    );
    const { code, data: token, message = '' } = res.data;
    if (code !== 1000) {
      this.logger.warn('Failed to get token', message);
      throw new TokenException(`Failed to get token \n${message}`);
    }
    this.logger.info('token updated');
    return token;
  }
}
