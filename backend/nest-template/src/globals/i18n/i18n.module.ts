import { Module } from '@nestjs/common';
import { AcceptLanguageResolver, I18nModule as NestI18nModule, QueryResolver } from 'nestjs-i18n';
import { join } from 'path';
import { isLocal } from 'src/utils';

@Module({
  imports: [
    NestI18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: join(__dirname, '../../i18n/'),
        watch: isLocal(),
      },
      resolvers: [{ use: QueryResolver, options: ['lang'] }, AcceptLanguageResolver],
    }),
  ],
})
export class I18nModule {}
