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
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
  ApiCreatedResponse,
} from "@nestjs/swagger";
import { Response } from "express";

import { CategoriesPrismaQuery } from "./categories.interface";
import { CategoriesService } from "./categories.service";
import { Categories } from "./dto/categories";

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
  @ApiCreatedResponse({ type: Categories })
  @ApiBody({ type: Categories })
  async create(@Body() categoryDto: Categories) {
    const created = await this.categoriesService.create(categoryDto);
    return created;
  }

  @Get()
  @Auth("admin")
  @ApiOkResponse({ type: Categories, isArray: true })
  @Header("Access-Control-Expose-Headers", "Content-Range")
  @ApiQuery({ name: "categoriesQuery", required: false })
  async findMany(@Res() res: Response, @UrlToPrismaQuery() prismaQuery: CategoriesPrismaQuery) {
    const { count, data } = await this.categoriesService.findMany(prismaQuery);
    res.header("Content-Range", `${count}`);
    res.send(data);
  }

  @Get(":id")
  @Auth("admin")
  @ApiOkResponse({ type: Categories })
  async findOne(@Param("id", ParseIntPipe) id: number) {
    const match = await this.categoriesService.findById(id);
    return match;
  }

  @Put(":id")
  @Auth("admin")
  @ApiOkResponse({ type: Categories })
  @ApiBody({ type: Categories })
  async update(@Param("id", ParseIntPipe) id: number, @Body() categoryDto: Categories) {
    const created = await this.categoriesService.update(id, categoryDto);
    return created;
  }

  @Delete(":id")
  @Auth("admin")
  @ApiOkResponse({ type: Categories })
  async remove(@Param("id", ParseIntPipe) id: number) {
    try {
      const deleted = await this.categoriesService.remove(id);
      return deleted;
    } catch (error) {
      throw new NotFoundException("User not found");
    }
  }
}
