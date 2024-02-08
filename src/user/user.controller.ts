import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseIntPipe,
  Put,
  Query,
  UnauthorizedException,
} from "@nestjs/common";

import { UserParam } from "./decorators/user.decorator";
import { UpdatePassword } from "./dto/password.dto";
import { UpdateDto } from "./dto/update.dto";
import { User } from "./user.entity";
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

  @Get()
  @Auth("admin")
  async getUsers(@PrismaQuery() prismaQuery): Promise<User[]> {
    return this.userService.getAll(prismaQuery);
  }

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

    const deleted = await this.userService.delete(id);
    if (!deleted) throw new NotFoundException("User not found");
    return true;
  }
}
