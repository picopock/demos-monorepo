import { Cluster, Redis as IORedis } from 'ioredis';

export type Redis = IORedis | Cluster;
