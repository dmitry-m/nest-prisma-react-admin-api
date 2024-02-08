import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UserController } from "./user.controller";
import { User } from "./user.entity";
import { UserService } from "./user.service";

import { PrismaService } from "../prisma/prisma.service";

@Module({
  controllers: [UserController],
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, PrismaService],
  exports: [UserService],
})
export class UserModule {}
