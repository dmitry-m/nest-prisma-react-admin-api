import { Prisma } from "@prisma/client";

export interface QueryForCommandsPrisma extends Prisma.CommandsFindManyArgs {
  where: Prisma.CommandsWhereInput & {
    q?: Prisma.StringNullableFilter<"Commands">;
  };
  orderBy: Prisma.CommandsOrderByWithRelationInput & { customer_id: string }[];
}
