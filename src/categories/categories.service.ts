import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

import { QueryForCategoriesPrisma } from "./categories.interface";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";

import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class CategoriesService {
  constructor(private prismaService: PrismaService) {}

  public async create(createCategoryDto: CreateCategoryDto) {
    return this.prismaService.categories.create({
      data: createCategoryDto,
    });
  }

  async findMany(prismaQuery: QueryForCategoriesPrisma) {
    const categoriesQuery: Prisma.CategoriesFindManyArgs = prismaQuery;

    // if (prismaQuery.where.q) {
    //   const { q, ...prismaWhere } = prismaQuery.where;
    //   categoriesQuery.where = { ...prismaWhere, OR: [{ last_name: q }, { first_name: q }] };
    // }

    if (prismaQuery.orderBy[0]?.category_id) {
      categoriesQuery.orderBy[0] = { id: prismaQuery.orderBy[0].category_id };
    }

    const [count, data] = await this.prismaService.$transaction([
      this.prismaService.categories.count({ where: categoriesQuery.where }),
      this.prismaService.categories.findMany(categoriesQuery),
    ]);

    return { count, data };
  }

  async findById(id: string) {
    const data = await this.prismaService.categories.findFirst({
      where: { id: +id },
    });

    return data;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return this.prismaService.categories.update({
      where: { id },
      data: updateCategoryDto,
    });
  }

  remove(id: number) {
    return this.prismaService.categories.delete({ where: { id } });
  }
}
