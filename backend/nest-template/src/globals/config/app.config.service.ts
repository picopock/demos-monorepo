import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { AppConfig, Throttle, BullMQConfig } from './app.config.interface';

@Injectable()
export class AppConfigService {
  private readonly prefix: string = 'app';

  constructor(private configService: NestConfigService) {}

  get<T = unknown>(path?: string): T {
    const prefixedPath = path ? `${this.prefix}.${path}` : this.prefix;
    return this.configService.get<T>(prefixedPath);
  }

  get appConfig() {
    return this.get<AppConfig>();
  }

  get appId(): string {
    return this.get<string>('id');
  }

  get baseUrl(): string {
    return this.get<string>('activity.baseUrl');
  }

  get appSecret(): string {
    return this.get<string>('activity.appSecret');
  }

  get tokenTtl(): number {
    return this.get<number>('token.ttl');
  }

  get throttleConfig() {
    return this.get<Throttle>('throttle');
  }

  get bullMQCodeWord() {
    return this.get<string>('bullMQ.codeWord');
  }

  get bullMQConfig(): BullMQConfig {
    return {
      codeWord: this.bullMQCodeWord,
    };
  }
}
