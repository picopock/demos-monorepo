import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  MemoryHealthIndicator,
  PrismaHealthIndicator,
} from '@nestjs/terminus';
import { PrismaService } from 'src/globals/prisma/prisma.service';

@Controller('healthz')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private memory: MemoryHealthIndicator,
    private prisma: PrismaService,
    private prismaHealth: PrismaHealthIndicator,
  ) {}

  @Get('liveness')
  @HealthCheck()
  @HttpCode(HttpStatus.OK)
  liveness() {
    return 'success';
  }

  @Get('readiness')
  @HealthCheck()
  readiness() {
    return this.health.check([
      () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024), // 150M
      () => this.prismaHealth.pingCheck('prisma-ping', this.prisma),
    ]);
  }
}
