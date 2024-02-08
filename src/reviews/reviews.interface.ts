import { Prisma } from "@prisma/client";

export interface QueryForReviewsPrisma extends Prisma.ReviewsFindManyArgs {
  where: Prisma.ReviewsWhereInput & {
    q?: Prisma.StringNullableFilter<"Reviews">;
  };
  orderBy: Prisma.ReviewsOrderByWithRelationInput & { review_id: string }[];
}
