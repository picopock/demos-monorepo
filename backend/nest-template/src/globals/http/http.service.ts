import { HttpService as NestHttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HttpService extends NestHttpService {}
