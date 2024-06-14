import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  Res,
  UnauthorizedException,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from "@nestjs/swagger";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Response } from "express";

import { UserParam } from "./decorators/user.decorator";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserEntity } from "./user.entity";
import { QueryForUsersPrisma } from "./user.interface";
import { UserService } from "./user.service";

import { Auth } from "../auth/decorators/auth.decorator";
import { UrlToPrismaQuery } from "../prisma/prisma.decorator";

@ApiBearerAuth()
@ApiTags("Users")
@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Auth("admin")
  @HttpCode(201)
  @ApiCreatedResponse({ type: UserEntity })
  @ApiBody({ type: CreateUserDto })
  async create(@Body() userDto: CreateUserDto) {
    try {
      const created = await this.userService.create(userDto);
      return created;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new ConflictException(error.message.split(/\n/).pop());
      }
      throw error;
    }
  }

  @Get()
  @Auth("admin")
  @ApiOkResponse({ type: UserEntity, isArray: true })
  @Header("Access-Control-Expose-Headers", "Content-Range")
  @ApiQuery({ name: "usersQuery", required: false })
  async findMany(@Res() res: Response, @UrlToPrismaQuery() prismaQuery: QueryForUsersPrisma) {
    const { count, data } = await this.userService.findMany(prismaQuery);
    res.header("Content-Range", `${count}`);
    res.send(data);
  }

  @Get(":id")
  @Auth("admin")
  @ApiOkResponse({ type: UserEntity })
  async findOne(@Param("id") id: string) {
    const match = await this.userService.findById(id);
    if (!match) throw new NotFoundException("User not found");

    return match;
  }

  @Put(":id")
  @Auth("admin")
  @ApiOkResponse({ type: UserEntity })
  @ApiBody({ type: UpdateUserDto })
  async update(@Param("id", ParseIntPipe) id: number, @Body() userDto: UpdateUserDto) {
    try {
      const updated = await this.userService.update(id, userDto);
      return updated;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        const errorMessage = error.message.split(/[ \r\n]/).pop();
        throw new NotFoundException(errorMessage);
      }
      throw error;
    }
  }

  @Delete(":id")
  @Auth("admin")
  @HttpCode(204)
  async deleteUser(
    @Param("id", ParseIntPipe) id: number,
    @UserParam("id") adminId: number,
  ): Promise<boolean> {
    if (id === adminId) throw new ConflictException("You can't remove yourself");

    const deleted = await this.userService.remove(id);

    if (!deleted) throw new NotFoundException("User not found");

    return true;
  }
}
