import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Header,
  Res,
  Put,
  HttpCode,
  ParseIntPipe,
  NotFoundException,
  ConflictException,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
  ApiCreatedResponse,
} from "@nestjs/swagger";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Response } from "express";

import { CommandEntity } from "./commands.entity";
import { CommandsPrismaQuery } from "./commands.interface";
import { CommandsService } from "./commands.service";
import { CreateCommandDto } from "./dto/create-command.dto";
import { UpdateCommandDto } from "./dto/update-command.dto";

import { Auth } from "../auth/decorators/auth.decorator";
import { UrlToPrismaQuery } from "../prisma/prisma.decorator";

@ApiBearerAuth()
@ApiTags("Commands")
@Controller("commands")
export class CommandsController {
  constructor(private commandsService: CommandsService) {}

  @Post()
  @Auth("admin")
  @HttpCode(201)
  @ApiCreatedResponse({ type: CommandEntity })
  @ApiBody({ type: CreateCommandDto })
  async create(@Body() commandDto: CreateCommandDto) {
    try {
      const created = await this.commandsService.create(commandDto);
      return created;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new ConflictException(error.message.replace(/(\r\n|\n|\r)/gm, ""));
      }
      throw error;
    }
  }

  @Get()
  @Auth("admin")
  @ApiOkResponse({ type: CommandEntity, isArray: true })
  @Header("Access-Control-Expose-Headers", "Content-Range")
  @ApiQuery({ name: "commandsQuery", required: false })
  async findMany(@Res() res: Response, @UrlToPrismaQuery() prismaQuery: CommandsPrismaQuery) {
    const { count, data } = await this.commandsService.findMany(prismaQuery);
    res.header("Content-Range", `${count}`);
    res.send(data);
  }

  @Get(":id")
  @Auth("admin")
  @ApiOkResponse({ type: CommandEntity })
  async findOne(@Param("id", ParseIntPipe) id: number) {
    const match = await this.commandsService.findById(id);
    return match;
  }

  @Put(":id")
  @Auth("admin")
  @ApiOkResponse({ type: CommandEntity })
  @ApiBody({ type: UpdateCommandDto })
  async update(@Param("id", ParseIntPipe) id: number, @Body() commandDto: UpdateCommandDto) {
    try {
      const updated = await this.commandsService.update(id, commandDto);
      return updated;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new NotFoundException(error.message.replace(/(\r\n|\n|\r)/gm, ""));
      }
      throw error;
    }
  }

  @Delete(":id")
  @Auth("admin")
  @ApiOkResponse({ type: CommandEntity })
  async remove(@Param("id", ParseIntPipe) id: number) {
    try {
      const deleted = await this.commandsService.remove(id);
      return deleted;
    } catch (error) {
      throw new NotFoundException("User not found");
    }
  }
}
