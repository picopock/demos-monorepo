export interface App {
  id: string;
  baseUrl: string;
  appKey: string;
  appSecret: string;
}

export interface Throttle {
  ttl: number;
  limit: number;
}

export interface Token {
  ttl: 1800000;
}

export interface BullMQConfig {
  codeWord: string;
}

export interface AppConfig {
  app: App;
  throttle: Throttle;
  token: Token;
  bullMQ: BullMQConfig;
}
