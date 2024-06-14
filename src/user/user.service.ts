import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { genSalt, hash } from "bcryptjs";

import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
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

  public async create({ password, ...user }: CreateUserDto) {
    const salt = await genSalt(10);

    return this.prismaService.users.create({
      data: { ...user, password: await hash(password, salt) },
    });
  }

  async getCount(): Promise<number> {
    return this.prismaService.users.count();
  }

  async findMany(prismaQuery: QueryForUsersPrisma) {
    const usersQuery: Prisma.UsersFindManyArgs = prismaQuery;

    if (prismaQuery.where.search) {
      const { search, ...prismaWhere } = prismaQuery.where;
      const searchArray = search.split(" ");

      usersQuery.where = {
        ...prismaWhere,
        OR: [
          ...searchArray.map((word) => ({
            email: { contains: word, mode: "insensitive" },
          })),
          ...searchArray.map((word) => ({
            name: { contains: word, mode: "insensitive" },
          })),
        ] as Prisma.UsersWhereInput[],
      };
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
    const salt = await genSalt(10);
    const { password, ...data } = updateUserDto;
    return this.prismaService.users.update({
      where: { id },
      data: password ? { ...data, password: await hash(password, salt) } : data,
    });
  }

  remove(id: number) {
    return this.prismaService.users.delete({ where: { id } });
  }
}
