import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/globals/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getUser(uid: string, tx: PrismaClient = this.prisma) {
    return tx.user.findUnique({ where: { uid } });
  }
}
