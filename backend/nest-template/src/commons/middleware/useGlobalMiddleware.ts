import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
import { enableCors } from '../middleware/cors.middleware';

export function useGlobalMiddlewares(app: NestExpressApplication) {
  enableCors(app);
  app.use(cookieParser());
}
