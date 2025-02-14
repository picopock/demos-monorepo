import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { AxiosConfig } from './axios.config.interface';

@Injectable()
export class AxiosConfigService {
  private readonly prefix: string = 'axios';

  constructor(private configService: NestConfigService) {}

  get<T = any>(path?: string): T {
    const prefixedPath = path ? `${this.prefix}.${path}` : this.prefix;
    return this.configService.get<T>(prefixedPath);
  }

  get axiosConfig() {
    return this.get<AxiosConfig>();
  }
}
