import { Controller, Get, Post, Body, Param, Delete, Header, Res, Put, Req } from "@nestjs/common";
import { ApiCreatedResponse, ApiOkResponse, ApiQuery } from "@nestjs/swagger";
import { Request, Response } from "express";

import { CategoriesEntity } from "./categories.entity";
import { QueryForCategoriesPrisma } from "./categories.interface";
import { CategoriesService } from "./categories.service";
import { CreateCategoryDto } from "./dto/create-category.dto";

import { PrismaQuery } from "../prisma/prisma.decorator";

@Controller("categories")
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Post()
  @ApiCreatedResponse({ type: CategoriesEntity })
  @ApiQuery({ name: "crudQuery", required: false })
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    const created = await this.categoriesService.create(createCategoryDto);
    return created;
  }

  @Get()
  @ApiOkResponse({ type: CategoriesEntity, isArray: true })
  @Header("Access-Control-Expose-Headers", "Content-Range")
  async findMany(
    @Res() res: Response,
    @Req() req: Request,
    @PrismaQuery() prismaQuery: QueryForCategoriesPrisma,
  ) {
    const { count, data } = await this.categoriesService.findMany(prismaQuery);
    res.header("Content-Range", `${count}`);
    res.send(data);
  }

  @Get(":id")
  @ApiOkResponse({ type: CategoriesEntity })
  @ApiQuery({ name: "crudQuery", required: false })
  async findOne(@Param("id") id: string) {
    const match = await this.categoriesService.findById(id);
    return match;
  }

  @Put(":id")
  @ApiCreatedResponse({ type: CategoriesEntity })
  async update(@Param("id") id: string, @Body() createCategoryDto: CreateCategoryDto) {
    const created = await this.categoriesService.update(+id, createCategoryDto);
    return created;
  }

  @Delete(":id")
  @ApiOkResponse({ type: CategoriesEntity })
  async remove(@Param("id") id: string) {
    return this.categoriesService.remove(+id);
  }
}
