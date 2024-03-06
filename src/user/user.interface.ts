import { Prisma } from "@prisma/client";

export interface QueryForUsersPrisma extends Prisma.UsersFindManyArgs {
  where: Prisma.UsersWhereInput & {
    q?: Prisma.StringNullableFilter<"Users">;
  };
  orderBy: Prisma.UsersOrderByWithRelationInput & { customer_id: string }[];
}
