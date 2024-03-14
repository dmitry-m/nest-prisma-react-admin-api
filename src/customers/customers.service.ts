import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

import { CustomersPrismaQuery } from "./customers.interface";
import { CreateCustomerDto } from "./dto/create-user.dto";
import { UpdateCustomerDto } from "./dto/update-user.dto";

import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class CustomersService {
  constructor(private prismaService: PrismaService) {}

  public async create(createCustomerDto: CreateCustomerDto) {
    return this.prismaService.customers.create({ data: createCustomerDto });
  }

  async findMany(prismaQuery: CustomersPrismaQuery) {
    const customersQuery: Prisma.CustomersFindManyArgs = prismaQuery;

    if (prismaQuery.where.search) {
      const { search, ...prismaWhere } = prismaQuery.where;
      customersQuery.where = {
        ...prismaWhere,
        OR: [
          { last_name: { contains: search, mode: "insensitive" } },
          { last_name: { in: search.split(" "), mode: "insensitive" } },

          { first_name: { contains: search, mode: "insensitive" } },
          { first_name: { in: search.split(" "), mode: "insensitive" } },
        ],
      };
    }

    const [count, data] = await this.prismaService.$transaction([
      this.prismaService.customers.count({ where: customersQuery.where }),
      this.prismaService.customers.findMany(customersQuery),
    ]);

    return { count, data };
  }

  async findById(id: number) {
    const data = await this.prismaService.customers.findFirst({
      where: { id },
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
