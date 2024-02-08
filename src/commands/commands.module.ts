import { Module } from "@nestjs/common";

import { CommandsController } from "./commands.controller";
import { CommandsService } from "./commands.service";

import { PrismaService } from "../prisma/prisma.service";

@Module({
  controllers: [CommandsController],
  providers: [CommandsService, PrismaService],
})
export class CommandsModule {}
