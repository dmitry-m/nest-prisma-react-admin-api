import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

import { CommandsPrismaQuery } from "./commands.interface";
import { CreateCommandDto } from "./dto/create-command.dto";
import { UpdateCommandDto } from "./dto/update-command.dto";

import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class CommandsService {
  constructor(private prismaService: PrismaService) {}

  public async create(createCommandDto: CreateCommandDto) {
    return this.prismaService.commands.create({ data: createCommandDto });
  }

  async findMany(prismaQuery: CommandsPrismaQuery) {
    const commandsQuery: Prisma.CommandsFindManyArgs = prismaQuery;

    if (prismaQuery.where.search) {
      const { search, ...prismaWhere } = prismaQuery.where;
      const searchArray = search.split(" ");

      commandsQuery.where = {
        ...prismaWhere,
        OR: [
          ...searchArray.map((word) => ({ reference: { contains: word, mode: "insensitive" } })),
        ] as Prisma.CommandsWhereInput[],
      };
    }

    const [count, data] = await this.prismaService.$transaction([
      this.prismaService.commands.count({ where: commandsQuery.where }),
      this.prismaService.commands.findMany(commandsQuery),
    ]);

    return { count, data };
  }

  async findById(id: number) {
    const data = await this.prismaService.commands.findFirst({
      where: { id },
    });

    return data;
  }

  async update(id: number, updateCommandDto: UpdateCommandDto) {
    return this.prismaService.commands.update({
      where: { id },
      data: updateCommandDto,
    });
  }

  remove(id: number) {
    return this.prismaService.commands.delete({ where: { id } });
  }
}
