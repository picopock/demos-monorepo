import { Inject } from '@nestjs/common';
import { REDIS_TOKEN } from 'src/constants/redis.constant';

export const InjectRedis = () => Inject(REDIS_TOKEN);
