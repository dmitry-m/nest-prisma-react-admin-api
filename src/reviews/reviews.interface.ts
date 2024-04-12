import { Prisma } from "@prisma/client";

export interface ReviewsPrismaQuery extends Prisma.ReviewsFindManyArgs {
  where: Prisma.ReviewsWhereInput & {
    search?: string;
  };
  orderBy: Prisma.ReviewsOrderByWithRelationInput & { review_id: string }[];
}
