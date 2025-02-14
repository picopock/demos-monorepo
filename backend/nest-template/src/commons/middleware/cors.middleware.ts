import { NestExpressApplication } from '@nestjs/platform-express';
import type { CustomOrigin } from '@nestjs/common/interfaces/external/cors-options.interface';

const whiteList = [];

const customOrigin: CustomOrigin = (reqOrigin, cb) => {
  const origin = whiteList.includes(reqOrigin) ? reqOrigin : false;
  cb(null, origin);
};

export function enableCors(app: NestExpressApplication) {
  app.enableCors({
    origin: customOrigin,
    methods: ['OPTIONS', 'GET', 'PUT', 'POST', 'DELETE'],
    allowedHeaders: ['X-Request-With', 'Content-Type', 'Accept', 'Origin', 'withCredentials'],
    credentials: true,
    maxAge: 300,
  });
}
