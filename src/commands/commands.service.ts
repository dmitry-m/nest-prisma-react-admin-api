import { Inject, Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

import { QueryForCommandsPrisma } from "./commands.interface";
import { UpdateCommandDto } from "./dto/update-command.dto";

import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class CommandsService {
  constructor(private prismaService: PrismaService) {}

  async findMany(prismaQuery: QueryForCommandsPrisma) {
    const commandsQuery: Prisma.CommandsFindManyArgs = prismaQuery;

    if (prismaQuery.where.q) {
      const { q, ...prismaWhere } = prismaQuery.where;
      commandsQuery.where = { ...prismaWhere, reference: q };
    }
    console.log({ where: commandsQuery.where });
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

  async update(id: number, updateCommandsDto: UpdateCommandDto) {
    return this.prismaService.commands.update({
      where: { id },
      data: updateCommandsDto,
    });
  }
}
