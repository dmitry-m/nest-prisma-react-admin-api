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
  Req,
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
import { Request, Response } from "express";

import { CreateReviewDto } from "./dto/create-reviews.dto";
import { UpdateReviewDto } from "./dto/update-reviews.dto";
import { ReviewsEntity } from "./reviews.entity";
import { ReviewsPrismaQuery } from "./reviews.interface";
import { ReviewsService } from "./reviews.service";

import { Auth } from "../auth/decorators/auth.decorator";
import { UrlToPrismaQuery } from "../prisma/prisma.decorator";

@Controller("reviews")
export class ReviewsController {
  constructor(private reviewsService: ReviewsService) {}

  @Post()
  @Auth("admin")
  @ApiCreatedResponse({ type: ReviewsEntity })
  @ApiQuery({ name: "crudQuery", required: false })
  async create(@Body() createReviewDto: CreateReviewDto) {
    try {
      const created = await this.reviewsService.create(createReviewDto);
      return created;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new ConflictException(error.message.replace(/(\r\n|\n|\r)/gm, ""));
      }
      throw error;
    }
  }

  @Get()
  @Auth("admin")
  @ApiOkResponse({ type: ReviewsEntity, isArray: true })
  @Header("Access-Control-Expose-Headers", "Content-Range")
  async findMany(@Res() res: Response, @UrlToPrismaQuery() prismaQuery: ReviewsPrismaQuery) {
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
  @Auth("admin")
  @ApiOkResponse({ type: ReviewsEntity })
  @ApiBody({ type: UpdateReviewDto })
  async update(@Param("id", ParseIntPipe) id: number, @Body() reviewDto: UpdateReviewDto) {
    try {
      const updated = await this.reviewsService.update(id, reviewDto);
      return updated;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new NotFoundException(error.message.replace(/(\r\n|\n|\r)/gm, ""));
      }
      throw error;
    }
  }

  @Delete(":id")
  @Auth("admin")
  @ApiOkResponse({ type: ReviewsEntity })
  async remove(@Param("id", ParseIntPipe) id: number) {
    try {
      const deleted = await this.reviewsService.remove(+id);
      return deleted;
    } catch (error) {
      throw new NotFoundException("User not found");
    }
  }
}
