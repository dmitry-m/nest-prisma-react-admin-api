import { Prisma } from "@prisma/client";

export interface InvoicesPrismaQuery extends Prisma.InvoicesFindManyArgs {
  where: Prisma.InvoicesWhereInput & {
    search?: Prisma.StringNullableFilter<"Invoices">;
  };
  orderBy: Prisma.InvoicesOrderByWithRelationInput & { invoice_id: string }[];
}
