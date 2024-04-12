import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

import { CategoriesPrismaQuery } from "./categories.interface";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";

import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class CategoriesService {
  constructor(private prismaService: PrismaService) {}

  public async create(createCategoryDto: CreateCategoryDto) {
    return this.prismaService.categories.create({ data: createCategoryDto });
  }

  async findMany(prismaQuery: CategoriesPrismaQuery) {
    const categoriesQuery: Prisma.CategoriesFindManyArgs = prismaQuery;

    if (prismaQuery.where.search) {
      const { search, ...prismaWhere } = prismaQuery.where;
      const searchArray = search.split(" ");

      categoriesQuery.where = {
        ...prismaWhere,
        OR: [
          ...searchArray.map((word) => ({ last_name: { contains: word, mode: "insensitive" } })),
          ...searchArray.map((word) => ({ first_name: { contains: word, mode: "insensitive" } })),
        ] as Prisma.CategoriesWhereInput[],
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
