import { NestExpressApplication } from '@nestjs/platform-express';

export function useGlobalInterceptors(app: NestExpressApplication) {
  // app.useGlobalInterceptors(new LoggingInterceptor());
}
