import { Prisma } from "@prisma/client";

export interface CommandsPrismaQuery extends Prisma.CommandsFindManyArgs {
  where: Prisma.CommandsWhereInput & {
    search: string;
  };
}
