import { Prisma } from "@prisma/client";

export interface ProductPrismaQuery extends Prisma.ProductsFindManyArgs {
  where: Prisma.ProductsWhereInput & {
    search?: string;
  };
  orderBy: Prisma.ProductsOrderByWithRelationInput & { product_id: string }[];
}
