import { Prisma } from "@prisma/client";

export interface QueryForCustomersPrisma extends Prisma.CustomersFindManyArgs {
  where: Prisma.CustomersWhereInput & {
    q?: Prisma.StringNullableFilter<"Customers">;
  };
  orderBy: Prisma.CustomersOrderByWithRelationInput & { customer_id: string }[];
}
