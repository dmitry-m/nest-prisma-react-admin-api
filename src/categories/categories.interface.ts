import { Prisma } from "@prisma/client";

export interface CategoriesPrismaQuery extends Prisma.CategoriesFindManyArgs {
  where: Prisma.CategoriesWhereInput & {
    search?: string;
  };
}
