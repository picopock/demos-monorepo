import { Controller, Get } from '@nestjs/common';
import { I18n, I18nContext } from 'nestjs-i18n';
import { TestService } from './test.service';
import { InjectRedis } from 'src/commons/decorator/index.decorator';
import { Redis } from 'src/globals/redis/redis.interface';

@Controller('test')
export class TestController {
  constructor(
    private readonly testService: TestService,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  @Get('i18n')
  async hello(@I18n() i18n: I18nContext) {
    return await i18n.t('test.WELCOME');
  }

  @Get('i18n-service')
  async hello2(@I18n() i18n: I18nContext) {
    return this.testService.getI18n();
  }

  @Get('http')
  async httpReq() {
    return this.testService.getApi();
  }

  @Get('logger')
  async logger() {
    return this.testService.getLogger();
  }

  @Get('redis')
  async testRedis() {
    return this.redis.set('nodeEnv', 'test');
    return this.redis.get('nodeEnv');
  }
}
