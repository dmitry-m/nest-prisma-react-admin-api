import { Prisma } from "@prisma/client";

export interface QueryForCategoriesPrisma extends Prisma.CategoriesFindManyArgs {
  where: Prisma.CategoriesWhereInput & {
    q?: Prisma.StringNullableFilter<"Categories">;
  };
  orderBy: Prisma.CategoriesOrderByWithRelationInput & { category_id: string }[];
}
