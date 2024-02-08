import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { compare, genSalt, hash } from "bcryptjs";
import { Repository, ILike } from "typeorm";

import { UpdatePassword } from "./dto/password.dto";
import { UpdateDto } from "./dto/update.dto";
import { User } from "./user.entity";

import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private prismaService: PrismaService,
  ) {}

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

  async delete(id: number): Promise<User> {
    return this.prismaService.users.delete({ where: { id } });
  }
}
