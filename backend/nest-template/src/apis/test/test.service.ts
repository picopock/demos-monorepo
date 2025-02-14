import { Injectable } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { I18nService } from 'nestjs-i18n';
import { lastValueFrom } from 'rxjs';
import { HttpService } from 'src/globals/http/http.service';

@Injectable()
export class TestService {
  constructor(
    private readonly httpService: HttpService,
    private readonly i18n: I18nService,
    @InjectPinoLogger(TestService.name)
    private readonly logger: PinoLogger,
  ) {}

  async getI18n() {
    return await this.i18n.t('test.WELCOME');
  }

  async getApi() {
    const { data } = await lastValueFrom(this.httpService.get('https://baidu.com'));
    return data;
  }

  getLogger() {
    this.logger.info('log from TestService');
    return 'log from TestService';
  }
}
