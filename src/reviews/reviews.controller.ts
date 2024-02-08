import { Controller, Get, Post, Body, Param, Delete, Header, Res, Put, Req } from "@nestjs/common";
import { ApiCreatedResponse, ApiOkResponse, ApiQuery } from "@nestjs/swagger";
import { Request, Response } from "express";

import { CreateReviewDto } from "./dto/create-reviews.dto";
import { ReviewsEntity } from "./reviews.entity";
import { QueryForReviewsPrisma } from "./reviews.interface";
import { ReviewsService } from "./reviews.service";

import { PrismaQuery } from "../prisma/prisma.decorator";

@Controller("reviews")
export class ReviewsController {
  constructor(private reviewsService: ReviewsService) {}

  @Post()
  @ApiCreatedResponse({ type: ReviewsEntity })
  @ApiQuery({ name: "crudQuery", required: false })
  async create(@Body() createReviewDto: CreateReviewDto) {
    const created = await this.reviewsService.create(createReviewDto);
    return created;
  }

  @Get()
  @ApiOkResponse({ type: ReviewsEntity, isArray: true })
  @Header("Access-Control-Expose-Headers", "Content-Range")
  async findMany(
    @Res() res: Response,
    @Req() req: Request,
    @PrismaQuery() prismaQuery: QueryForReviewsPrisma,
  ) {
    const { count, data } = await this.reviewsService.findMany(prismaQuery);
    res.header("Content-Range", `${count}`);
    res.send(data);
  }

  @Get(":id")
  @ApiOkResponse({ type: ReviewsEntity })
  @ApiQuery({ name: "crudQuery", required: false })
  async findOne(@Param("id") id: string) {
    const match = await this.reviewsService.findById(id);
    return match;
  }

  @Put(":id")
  @ApiCreatedResponse({ type: ReviewsEntity })
  async update(@Param("id") id: string, @Body() createReviewDto: CreateReviewDto) {
    const created = await this.reviewsService.update(+id, createReviewDto);
    return created;
  }

  @Delete(":id")
  @ApiOkResponse({ type: ReviewsEntity })
  async remove(@Param("id") id: string) {
    return this.reviewsService.remove(+id);
  }
}
