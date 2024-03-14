import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

import { CategoriesPrismaQuery } from "./categories.interface";
import { Categories } from "./dto/categories";

import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class CategoriesService {
  constructor(private prismaService: PrismaService) {}

  public async create(createCategoryDto: Categories) {
    const { id, ...category } = createCategoryDto;
    return this.prismaService.categories.create({ data: category });
  }

  async findMany(prismaQuery: CategoriesPrismaQuery) {
    const categoriesQuery: Prisma.CategoriesFindManyArgs = prismaQuery;

    if (prismaQuery.where.search) {
      const { search, ...prismaWhere } = prismaQuery.where;
      categoriesQuery.where = {
        ...prismaWhere,
      };
    }

    const [count, data] = await this.prismaService.$transaction([
      this.prismaService.categories.count({ where: categoriesQuery.where }),
      this.prismaService.categories.findMany(categoriesQuery),
    ]);

    return { count, data };
  }

  async findById(id: number) {
    const data = await this.prismaService.categories.findFirst({
      where: { id },
    });

    return data;
  }

  async update(id: number, updateCategoryDto: Categories) {
    return this.prismaService.categories.update({
      where: { id },
      data: updateCategoryDto,
    });
  }

  remove(id: number) {
    return this.prismaService.categories.delete({ where: { id } });
  }
}
