import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { compare, genSalt, hash } from "bcryptjs";

import { CreateUserDto } from "./dto/create-user.dto";
import { UpdatePassword } from "./dto/password.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UpdateDto } from "./dto/update.dto";
import { User } from "./user.entity";
import { QueryForUsersPrisma } from "./user.interface";

import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  public async getAll(prismaQuery) {
    return this.prismaService.users.findMany(prismaQuery);
  }

  public async getById(id: number) {
    return this.prismaService.users.findFirst({ where: { id } });
  }

  public getByEmail(email: string) {
    return this.prismaService.users.findFirst({ where: { email } });
  }

  public async create({ email, password }: { email: string; password: string }) {
    const salt = await genSalt(10);

    return this.prismaService.users.create({
      data: { email, password: await hash(password, salt) },
    });
  }

  async updateProfile(id: number, { isAdmin }: UpdateDto): Promise<User> {
    const data = await this.getById(id);
    data.isAdmin = isAdmin;

    return this.prismaService.users.update({ where: { id: data.id }, data });
  }

  async updatePassword(id: number, { password, newPassword }: UpdatePassword): Promise<User> {
    const data = await this.getById(id);
    const passwordValid = await compare(password, data.password);

    if (!passwordValid) {
      return null;
    }

    data.password = await hash(newPassword, await genSalt(10));

    return this.prismaService.users.update({ where: { id: data.id }, data });
  }

  async getCount(): Promise<number> {
    return this.prismaService.users.count();
  }

  // public async create(createUserDto: CreateUserDto) {
  //   return this.prismaService.users.create({
  //     data: { ...createUserDto },
  //   });
  // }

  async findMany(prismaQuery: QueryForUsersPrisma) {
    console.log({ prismaQuery });
    const usersQuery: Prisma.UsersFindManyArgs = prismaQuery;

    if (prismaQuery.where.q) {
      const { q, ...prismaWhere } = prismaQuery.where;
      usersQuery.where = { ...prismaWhere, OR: [{ email: q }, { fullName: q }] };
    }

    const [count, data] = await this.prismaService.$transaction([
      this.prismaService.users.count({ where: usersQuery.where }),
      this.prismaService.users.findMany(usersQuery),
    ]);

    return { count, data };
  }

  async findById(id: string) {
    const data = await this.prismaService.users.findFirst({
      where: { id: +id },
    });

    return data;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return this.prismaService.users.update({
      where: { id },
      data: updateUserDto,
    });
  }

  remove(id: number) {
    return this.prismaService.users.delete({ where: { id } });
  }
}
