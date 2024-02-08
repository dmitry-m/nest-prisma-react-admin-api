import { Inject, Injectable } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class CommandsService {
  constructor(private prismaService: PrismaService) {}

  async findMany(prismaQuery) {
    const [count, data] = await this.prismaService.$transaction([
      this.prismaService.commands.count({ where: prismaQuery.where }),
      this.prismaService.commands.findMany(prismaQuery),
    ]);

    return { count, data };
  }

  async findById(id: string) {
    const data = await this.prismaService.commands.findFirst({
      where: { id: +id },
    });

    return data;
  }
}
