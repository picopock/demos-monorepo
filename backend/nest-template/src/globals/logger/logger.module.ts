import { DynamicModule, Global, Module } from '@nestjs/common';
import { Logger, LoggerModule as PinoLoggerModule } from 'nestjs-pino';
import { EnvConfigService } from '../config/env.config.service';

@Global()
@Module({ providers: [Logger], exports: [Logger] })
export class LoggerModule extends PinoLoggerModule {
  static forRootAsync(): DynamicModule {
    return super.forRootAsync({
      useFactory: (envConfigService: EnvConfigService) => {
        const { isProdMode } = envConfigService;
        return {
          pinoHttp: {
            level: isProdMode ? 'info' : 'debug',
            customLogLevel(_, res: { statusCode: number }, err) {
              if (res.statusCode >= 400 && res.statusCode < 500) {
                return 'warn';
              } else if (res.statusCode >= 500 || err) {
                return 'error';
              } else if (res.statusCode >= 300 && res.statusCode < 400) {
                return 'silent';
              }
              return 'info';
            },
            // install 'pino-pretty' package in order to use the following option
            transport: isProdMode
              ? undefined
              : {
                  target: 'pino-pretty',
                  options: {
                    colorize: true,
                    colorizeObjects: true,
                    levelFirst: true,
                    translateTime: true,
                  },
                },
            // and all the other fields of:
            // - https://github.com/pinojs/pino-http#api
            // - https://github.com/pinojs/pino/blob/HEAD/docs/api.md#options-object
          },
        };
      },
      inject: [EnvConfigService],
    });
  }
}
