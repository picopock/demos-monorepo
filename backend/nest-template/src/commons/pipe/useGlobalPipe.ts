import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';

export function useGlobalPipes(app: NestExpressApplication) {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 忽略 DTO 中未定义的属性
      transform: true, // 自动将请求体转换为 DTO 类的实例
    }),
  );
}
