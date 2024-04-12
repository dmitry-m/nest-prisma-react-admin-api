import { Prisma } from "@prisma/client";

export interface QueryForUsersPrisma extends Prisma.UsersFindManyArgs {
  where: Prisma.UsersWhereInput & {
    search?: string;
  };
}
