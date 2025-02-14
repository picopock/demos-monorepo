import Axios, { AxiosError } from 'axios';
import { forwardRef, Global, Inject, Module, OnModuleInit } from '@nestjs/common';
import { HttpModuleOptions } from '@nestjs/axios';
import { AxiosConfigService } from '../config/axios.config.service';
import { AppConfigService } from '../config/app.config.service';
import { TokenService } from './token.service';
import { HttpService } from './http.service';
import { BEARER_AUTH } from 'src/constants/auth.constant';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import {
  HTTP_MODULE_OPTIONS,
  HTTP_MODULE_ID,
  AXIOS_INSTANCE_TOKEN,
} from '@nestjs/axios/dist/http.constants';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

@Global()
@Module({
  providers: [
    {
      provide: HTTP_MODULE_OPTIONS,
      useFactory: (axiosConfigService: AxiosConfigService, appConfigService: AppConfigService) => {
        const { baseUrl } = appConfigService;
        return {
          ...axiosConfigService.axiosConfig,
          baseURL: baseUrl,
        };
      },
      inject: [AxiosConfigService, AppConfigService],
    },
    {
      provide: AXIOS_INSTANCE_TOKEN,
      useFactory: (config: HttpModuleOptions) => {
        return Axios.create(config);
      },
      inject: [HTTP_MODULE_OPTIONS],
    },
    {
      provide: HTTP_MODULE_ID,
      useValue: randomStringGenerator(),
    },
    HttpService,
    TokenService,
  ],
  exports: [HttpService, TokenService],
})
export class HttpModule implements OnModuleInit {
  constructor(
    @InjectPinoLogger(HttpModule.name)
    private readonly logger: PinoLogger,
    private readonly httpService: HttpService,
    @Inject(forwardRef(() => TokenService))
    private readonly tokenService: TokenService,
  ) {}

  onModuleInit() {
    this.httpService.axiosRef.interceptors.request.use(
      async (config) => {
        const isNeedToken = config?.headers?.Authorization === BEARER_AUTH;
        if (isNeedToken) {
          const token = await this.tokenService.getToken();
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      function (error) {
        return Promise.reject(error);
      },
    );

    this.httpService.axiosRef.interceptors.response.use(
      (val) => val,
      (err: AxiosError) => {
        const {
          request: { path, method },
          message,
        } = err;
        this.logger.info(`
          ${method}::${path}\n errMsg: ${message}
        `);
        throw err;
      },
    );
  }
}
