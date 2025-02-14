import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppConfigService } from '../config/app.config.service';

@Module({
  imports: [
    ThrottlerModule.forRootAsync({
      useFactory: (appConfigService: AppConfigService) => {
        return {
          throttlers: [appConfigService.throttleConfig],
        };
      },
      inject: [AppConfigService],
    }),
  ],
})
export class ThrottleModule {}
