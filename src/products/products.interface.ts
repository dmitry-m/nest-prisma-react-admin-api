import { Prisma } from "@prisma/client";

export interface QueryForProductsPrisma extends Prisma.ProductsFindManyArgs {
  where: Prisma.ProductsWhereInput & {
    q?: Prisma.StringNullableFilter<"Products">;
  };
  orderBy: Prisma.ProductsOrderByWithRelationInput & { product_id: string }[];
}
