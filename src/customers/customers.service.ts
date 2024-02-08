import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

import { QueryForCustomersPrisma } from "./customers.interface";
import { CreateCustomerDto } from "./dto/create-customer.dto";
import { UpdateCustomerDto } from "./dto/update-customer.dto";

import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class CustomersService {
  constructor(private prismaService: PrismaService) {}

  public async create(createCustomerDto: CreateCustomerDto) {
    return this.prismaService.customers.create({
      data: { ...createCustomerDto, birthday: new Date(createCustomerDto.birthday) },
    });
  }

  async findMany(prismaQuery: QueryForCustomersPrisma) {
    const customersQuery: Prisma.CustomersFindManyArgs = prismaQuery;

    if (prismaQuery.where.q) {
      const { q, ...prismaWhere } = prismaQuery.where;
      customersQuery.where = { ...prismaWhere, OR: [{ last_name: q }, { first_name: q }] };
    }

    if (prismaQuery.orderBy[0]?.customer_id) {
      customersQuery.orderBy[0] = { id: prismaQuery.orderBy[0].customer_id };
    }

    const [count, data] = await this.prismaService.$transaction([
      this.prismaService.customers.count({ where: customersQuery.where }),
      this.prismaService.customers.findMany(customersQuery),
    ]);

    return { count, data };
  }

  async findById(id: string) {
    const data = await this.prismaService.customers.findFirst({
      where: { id: +id },
    });

    return data;
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return this.prismaService.customers.update({
      where: { id },
      data: updateCustomerDto,
    });
  }

  remove(id: number) {
    return this.prismaService.customers.delete({ where: { id } });
  }
}
