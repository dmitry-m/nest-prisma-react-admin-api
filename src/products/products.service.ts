import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { ProductPrismaQuery } from "./products.interface";

import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ProductsService {
  constructor(private prismaService: PrismaService) {}

  public async create(createProductDto: CreateProductDto) {
    return this.prismaService.products.create({ data: createProductDto });
  }

  async findMany(prismaQuery: ProductPrismaQuery) {
    const productsQuery: Prisma.ProductsFindManyArgs = prismaQuery;

    if (prismaQuery.where.search) {
      const { search, ...prismaWhere } = prismaQuery.where;
      const searchArray = search.split(" ");

      productsQuery.where = {
        ...prismaWhere,
        OR: [
          ...searchArray.map((word) => ({ reference: { contains: word, mode: "insensitive" } })),
          ...searchArray.map((word) => ({ description: { contains: word, mode: "insensitive" } })),
        ] as Prisma.ProductsWhereInput[],
      };
    }

    const [count, data] = await this.prismaService.$transaction([
      this.prismaService.products.count({ where: productsQuery.where }),
      this.prismaService.products.findMany(productsQuery),
    ]);

    return { count, data };
  }

  async findById(id: number) {
    const data = await this.prismaService.products.findFirst({
      where: { id },
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
