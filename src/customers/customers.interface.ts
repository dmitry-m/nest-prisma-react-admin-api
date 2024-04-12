import { Prisma } from "@prisma/client";

export interface CustomersPrismaQuery extends Prisma.CustomersFindManyArgs {
  where: Prisma.CustomersWhereInput & {
    search?: string;
  };
}
