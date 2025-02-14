import { Global, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

import envLoader from './loader/env.loader';
import configLoader from './loader/config.loader';
import { EnvConfigService } from './env.config.service';
import { AxiosConfigService } from './axios.config.service';
import { AppConfigService } from './app.config.service';

@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      ignoreEnvFile: true,
      ignoreEnvVars: true,
      load: [envLoader, ...configLoader()],
    }),
  ],
  providers: [EnvConfigService, AxiosConfigService, AppConfigService],
  exports: [EnvConfigService, AxiosConfigService, AppConfigService],
})
export class ConfigModule {}
