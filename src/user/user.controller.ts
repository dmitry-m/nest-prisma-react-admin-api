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
import { ApiCreatedResponse, ApiOkResponse, ApiQuery } from "@nestjs/swagger";
import { Request, Response } from "express";

import { UserParam } from "./decorators/user.decorator";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdatePassword } from "./dto/password.dto";
import { UpdateDto } from "./dto/update.dto";
import { User, User as UsersEntity } from "./user.entity";
import { QueryForUsersPrisma } from "./user.interface";
import { UserService } from "./user.service";

import { Auth } from "../auth/decorators/auth.decorator";
import { PrismaQuery } from "../prisma/prisma.decorator";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("profile")
  @Auth()
  async profile(@UserParam("id") id: number): Promise<User> {
    return this.userService.getById(id);
  }

  @Put("profile")
  @Auth()
  async updatePassword(@UserParam("id") id: number, @Body() data: UpdatePassword): Promise<User> {
    const user = await this.userService.updatePassword(id, data);

    if (!user) throw new UnauthorizedException("Invalid password or no changes");

    return user;
  }

  @Put("update")
  @Auth()
  async updateUser(@UserParam("id") id: number, @Body() data: UpdateDto): Promise<User> {
    return this.userService.updateProfile(id, data);
  }

  @Get("count")
  @Auth("admin")
  async getCountUsers() {
    return this.userService.getCount();
  }

  // @Get()
  // @Auth("admin")
  // async getUsers(@PrismaQuery() prismaQuery): Promise<User[]> {
  //   return this.userService.getAll(prismaQuery);
  // }

  @Get(":id")
  @Auth("admin")
  async getUser(@Param("id", ParseIntPipe) id: number): Promise<User> {
    return this.userService.getById(id);
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

  @Post()
  @Auth("admin")
  @ApiCreatedResponse({ type: UsersEntity })
  @ApiQuery({ name: "crudQuery", required: false })
  async create(@Body() createUserDto: CreateUserDto) {
    const created = await this.userService.create(createUserDto);

    return created;
  }

  @Get()
  @Auth("admin")
  @ApiOkResponse({ type: UsersEntity, isArray: true })
  @Header("Access-Control-Expose-Headers", "Content-Range")
  async findMany(
    @Res() res: Response,
    @Req() req: Request,
    @PrismaQuery() prismaQuery: QueryForUsersPrisma,
  ) {
    const { count, data } = await this.userService.findMany(prismaQuery);

    res.header("Content-Range", `${count}`);

    res.send(data);
  }

  @Get(":id")
  @Auth("admin")
  @ApiOkResponse({ type: UsersEntity })
  @ApiQuery({ name: "crudQuery", required: false })
  async findOne(@Param("id") id: string) {
    const match = await this.userService.findById(id);

    return match;
  }

  // @Put(":id")
  // @Auth("admin")
  // @ApiCreatedResponse({ type: UsersEntity })
  // async update(@Param("id") id: string, @Body() createUserDto: CreateUserDto) {
  //   const created = await this.userService.update(+id, createUserDto);

  //   return created;
  // }

  @Delete(":id")
  @Auth("admin")
  @ApiOkResponse({ type: UsersEntity })
  remove(@Param("id") id: string) {
    return this.userService.remove(+id);
  }
}
