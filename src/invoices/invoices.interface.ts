import { Prisma } from "@prisma/client";

export interface QueryForInvoicesPrisma extends Prisma.InvoicesFindManyArgs {
  where: Prisma.InvoicesWhereInput & {
    q?: Prisma.StringNullableFilter<"Invoices">;
  };
  orderBy: Prisma.InvoicesOrderByWithRelationInput & { invoice_id: string }[];
}
