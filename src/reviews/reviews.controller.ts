import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Header,
  Res,
  Put,
  HttpCode,
  ParseIntPipe,
  NotFoundException,
  ConflictException,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
  ApiCreatedResponse,
} from "@nestjs/swagger";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Response } from "express";

import { CreateReviewDto } from "./dto/create-review.dto";
import { UpdateReviewDto } from "./dto/update-review.dto";
import { ReviewEntity } from "./reviews.entity";
import { ReviewsPrismaQuery } from "./reviews.interface";
import { ReviewsService } from "./reviews.service";

import { Auth } from "../auth/decorators/auth.decorator";
import { UrlToPrismaQuery } from "../prisma/prisma.decorator";

@ApiBearerAuth()
@ApiTags("Reviews")
@Controller("reviews")
export class ReviewsController {
  constructor(private reviewsService: ReviewsService) {}

  @Post()
  @Auth("admin")
  @HttpCode(201)
  @ApiCreatedResponse({ type: ReviewEntity })
  @ApiBody({ type: CreateReviewDto })
  async create(@Body() reviewDto: CreateReviewDto) {
    try {
      const created = await this.reviewsService.create(reviewDto);
      return created;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new ConflictException(error.message.split(/\n/).pop());
      }
      throw error;
    }
  }

  @Get()
  @Auth("admin")
  @ApiOkResponse({ type: ReviewEntity, isArray: true })
  @Header("Access-Control-Expose-Headers", "Content-Range")
  @ApiQuery({ name: "reviewsQuery", required: false })
  async findMany(@Res() res: Response, @UrlToPrismaQuery() prismaQuery: ReviewsPrismaQuery) {
    const { count, data } = await this.reviewsService.findMany(prismaQuery);
    res.header("Content-Range", `${count}`);
    res.send(data);
  }

  @Get(":id")
  @Auth("admin")
  @ApiOkResponse({ type: ReviewEntity })
  async findOne(@Param("id", ParseIntPipe) id: number) {
    const match = await this.reviewsService.findById(id);
    if (!match) throw new NotFoundException("Review not found");

    return match;
  }

  @Put(":id")
  @Auth("admin")
  @ApiOkResponse({ type: ReviewEntity })
  @ApiBody({ type: UpdateReviewDto })
  async update(@Param("id", ParseIntPipe) id: number, @Body() reviewDto: UpdateReviewDto) {
    try {
      const updated = await this.reviewsService.update(id, reviewDto);
      return updated;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        const errorMessage = error.message.split(/[ \r\n]/).pop();
        throw new NotFoundException(errorMessage);
      }
      throw error;
    }
  }

  @Delete(":id")
  @Auth("admin")
  @ApiOkResponse({ type: ReviewEntity })
  async remove(@Param("id", ParseIntPipe) id: number) {
    try {
      const deleted = await this.reviewsService.remove(id);
      return deleted;
    } catch (error) {
      throw new NotFoundException("Review not found");
    }
  }
}
