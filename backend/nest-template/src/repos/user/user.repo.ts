import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/globals/prisma/prisma.service';

@Injectable()
export class UserRepo {
  constructor(private readonly prisma: PrismaService) {}

  async getUser(uid: string, tx: PrismaClient = this.prisma) {
    return tx.user.findFirst({ where: { uid } });
  }

  async updateUser(uid: string, data, tx: PrismaClient = this.prisma) {
    return tx.user.update({ where: { uid }, data });
  }

  async addUser(data, tx: PrismaClient = this.prisma) {
    return tx.user.create({ data });
  }
}
