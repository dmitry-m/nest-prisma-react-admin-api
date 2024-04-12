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

import { CategoryEntity } from "./categories.entity";
import { CategoriesPrismaQuery } from "./categories.interface";
import { CategoriesService } from "./categories.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";

import { Auth } from "../auth/decorators/auth.decorator";
import { UrlToPrismaQuery } from "../prisma/prisma.decorator";

@ApiBearerAuth()
@ApiTags("Categories")
@Controller("categories")
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Post()
  @Auth("admin")
  @HttpCode(201)
  @ApiCreatedResponse({ type: CategoryEntity })
  @ApiBody({ type: CreateCategoryDto })
  async create(@Body() categoryDto: CreateCategoryDto) {
    try {
      const created = await this.categoriesService.create(categoryDto);
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
  @ApiOkResponse({ type: CategoryEntity, isArray: true })
  @Header("Access-Control-Expose-Headers", "Content-Range")
  @ApiQuery({ name: "categoriesQuery", required: false })
  async findMany(@Res() res: Response, @UrlToPrismaQuery() prismaQuery: CategoriesPrismaQuery) {
    const { count, data } = await this.categoriesService.findMany(prismaQuery);
    res.header("Content-Range", `${count}`);
    res.send(data);
  }

  @Get(":id")
  @Auth("admin")
  @ApiOkResponse({ type: CategoryEntity })
  async findOne(@Param("id", ParseIntPipe) id: number) {
    const match = await this.categoriesService.findById(id);
    return match;
  }

  @Put(":id")
  @Auth("admin")
  @ApiOkResponse({ type: CategoryEntity })
  @ApiBody({ type: UpdateCategoryDto })
  async update(@Param("id", ParseIntPipe) id: number, @Body() categoryDto: UpdateCategoryDto) {
    try {
      const updated = await this.categoriesService.update(id, categoryDto);
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
  @ApiOkResponse({ type: CategoryEntity })
  async remove(@Param("id", ParseIntPipe) id: number) {
    try {
      const deleted = await this.categoriesService.remove(id);
      return deleted;
    } catch (error) {
      throw new NotFoundException("User not found");
    }
  }
}
