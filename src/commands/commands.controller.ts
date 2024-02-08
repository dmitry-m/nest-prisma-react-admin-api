import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Header,
  Res,
} from "@nestjs/common";
import { Response } from "express";

import { CommandsService } from "./commands.service";
import { CreateCommandDto } from "./dto/create-command.dto";
import { UpdateCommandDto } from "./dto/update-command.dto";

import { PrismaQuery } from "../prisma/prisma.decorator";

@Controller("commands")
export class CommandsController {
  constructor(private readonly commandsService: CommandsService) {}

  // @Post()
  // async create(
  //   @Body() createCommandDto: CreateCommandDto,
  //   @Query('crudQuery') crudQuery: string,
  // ) {
  //   const created = await this.commandsService.create(createCommandDto, {
  //     crudQuery,
  //   });
  //   return created;
  // }

  @Get()
  @Header("Access-Control-Expose-Headers", "Content-Range")
  async findMany(@Res() res: Response, @PrismaQuery() prismaQuery) {
    console.log("commands");
    const { count, data } = await this.commandsService.findMany(prismaQuery);
    console.log({ data });
    res.header("Content-Range", `${count}`);
    res.send(data);
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    const match = await this.commandsService.findById(id);
    return match;
  }

  // @Patch(':id')
  // async update(
  //   @Param('id') id: string,
  //   @Body() updateCommandDto: UpdateCommandDto,
  //   @Query('crudQuery') crudQuery: string,
  // ) {
  //   const updated = await this.commandsService.update(id, updateCommandDto, {
  //     crudQuery,
  //   });
  //   return updated;
  // }

  // @Delete(':id')
  // async remove(@Param('id') id: string, @Query('crudQuery') crudQuery: string) {
  //   return this.commandsService.remove(id, { crudQuery });
  // }
}
