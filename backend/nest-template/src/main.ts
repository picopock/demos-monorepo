import { NestFactory } from '@nestjs/core';
import { RequestMethod, VERSION_NEUTRAL, VersioningType } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger } from 'nestjs-pino';

import { AppModule } from './globals/app/app.module';
import { useGlobalFilters } from './commons/filter/index.filter';
import { useGlobalGuards } from './commons/guard/index.guard';
import { useGlobalMiddlewares } from './commons/middleware/index.middleware';
import { useGlobalPipes } from './commons/pipe/index.pipe';
import { useGlobalInterceptors } from './commons/interceptor/index.interceptor';
import { EnvConfigService } from './globals/config/env.config.service';

const getHttpPort = (app: NestExpressApplication): number => {
  const envConfigService = app.get(EnvConfigService);
  const port = envConfigService.HTTPPort;
  return port;
};

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });
  const logger = app.get(Logger);
  app.useLogger(logger);
  app.disable('x-powered-by');
  app.setGlobalPrefix('api', {
    exclude: [
      { path: 'healthz/(.*)', method: RequestMethod.GET },
      { path: 'metrics/(.*)', method: RequestMethod.GET },
    ],
  });
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: VERSION_NEUTRAL,
  });
  app.enableShutdownHooks();

  useGlobalMiddlewares(app);
  useGlobalGuards(app);
  useGlobalInterceptors(app);
  useGlobalPipes(app);
  useGlobalFilters(app);

  const httpPort = getHttpPort(app);
  await app.listen(httpPort, () => {
    logger.log(`Application is running on port ${httpPort}`);
  });
}
bootstrap();
