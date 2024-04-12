import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

import { CreateReviewDto } from "./dto/create-reviews.dto";
import { UpdateReviewDto } from "./dto/update-reviews.dto";
import { ReviewsPrismaQuery } from "./reviews.interface";

import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ReviewsService {
  constructor(private prismaService: PrismaService) {}

  public async create(createReviewDto: CreateReviewDto) {
    return this.prismaService.reviews.create({
      data: { ...createReviewDto, date: new Date(createReviewDto.date) },
    });
  }

  async findMany(prismaQuery: ReviewsPrismaQuery) {
    const reviewsQuery: Prisma.ReviewsFindManyArgs = prismaQuery;

    if (prismaQuery.where.search) {
      const { search, ...prismaWhere } = prismaQuery.where;
      const searchArray = search.split(" ");

      reviewsQuery.where = {
        ...prismaWhere,
        OR: searchArray.map((word) => ({ comment: { contains: word, mode: "insensitive" } })),
      };
    }

    const [count, data] = await this.prismaService.$transaction([
      this.prismaService.reviews.count({ where: reviewsQuery.where }),
      this.prismaService.reviews.findMany(reviewsQuery),
    ]);

    return { count, data };
  }

  async findById(id: string) {
    const data = await this.prismaService.reviews.findFirst({
      where: { id: +id },
    });

    return data;
  }

  async update(id: number, updateReviewDto: UpdateReviewDto) {
    return this.prismaService.reviews.update({
      where: { id },
      data: updateReviewDto,
    });
  }

  remove(id: number) {
    return this.prismaService.reviews.delete({ where: { id } });
  }
}
