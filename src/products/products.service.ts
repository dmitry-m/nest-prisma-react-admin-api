import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { QueryForProductsPrisma } from "./products.interface";

import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ProductsService {
  constructor(private prismaService: PrismaService) {}

  public async create(createProductDto: CreateProductDto) {
    return this.prismaService.products.create({ data: createProductDto });
  }

  async findMany(prismaQuery: QueryForProductsPrisma) {
    const productsQuery: Prisma.ProductsFindManyArgs = prismaQuery;

    // if (prismaQuery.where.q) {
    //   const { q, ...prismaWhere } = prismaQuery.where;
    //   productsQuery.where = { ...prismaWhere, OR: [{ last_name: q }, { first_name: q }] };
    // }

    if (prismaQuery.orderBy[0]?.product_id) {
      productsQuery.orderBy[0] = { id: prismaQuery.orderBy[0].product_id };
    }

    const [count, data] = await this.prismaService.$transaction([
      this.prismaService.products.count({ where: productsQuery.where }),
      this.prismaService.products.findMany(productsQuery),
    ]);

    return { count, data };
  }

  async findById(id: string) {
    const data = await this.prismaService.products.findFirst({
      where: { id: +id },
    });

    return data;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    return this.prismaService.products.update({
      where: { id },
      data: updateProductDto,
    });
  }

  remove(id: number) {
    return this.prismaService.products.delete({ where: { id } });
  }
}
