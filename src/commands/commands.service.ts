import { Inject, Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

import { QueryForCommandsPrisma } from "./commands.interface";

import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class CommandsService {
  constructor(private prismaService: PrismaService) {}

  async findMany(prismaQuery: QueryForCommandsPrisma) {
    // const [count, data] = await this.prismaService.$transaction([
    //   this.prismaService.commands.count({ where: prismaQuery.where }),
    //   this.prismaService.commands.findMany(prismaQuery),
    // ]);

    // return { count, data };
    const commandsQuery: Prisma.CommandsFindManyArgs = prismaQuery;

    if (prismaQuery.where.q) {
      const { q, ...prismaWhere } = prismaQuery.where;
      commandsQuery.where = { ...prismaWhere, reference: q };
    }

    if (prismaQuery.orderBy[0]?.customer_id) {
      commandsQuery.orderBy[0] = { id: prismaQuery.orderBy[0].customer_id };
    }

    const [count, data] = await this.prismaService.$transaction([
      this.prismaService.commands.count({ where: commandsQuery.where }),
      this.prismaService.commands.findMany(commandsQuery),
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
