import { Controller, Get, Post, Body, Param, Delete, Header, Res, Put, Req } from "@nestjs/common";
import { ApiCreatedResponse, ApiOkResponse, ApiQuery } from "@nestjs/swagger";
import { Request, Response } from "express";

import { CreateProductDto } from "./dto/create-product.dto";
import { Products } from "./dto/products";
import { ProductsEntity } from "./products.entity";
import { QueryForProductsPrisma } from "./products.interface";
import { ProductsService } from "./products.service";

import { UrlToPrismaQuery } from "../prisma/prisma.decorator";

@Controller("products")
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Post()
  @ApiCreatedResponse({ type: ProductsEntity })
  @ApiQuery({ name: "crudQuery", required: false })
  async create(@Body() createProductDto: Products) {
    const created = await this.productsService.create(createProductDto);
    return created;
  }

  @Get()
  @ApiOkResponse({ type: ProductsEntity, isArray: true })
  @Header("Access-Control-Expose-Headers", "Content-Range")
  async findMany(
    @Res() res: Response,
    @Req() req: Request,
    @UrlToPrismaQuery() prismaQuery: QueryForProductsPrisma,
  ) {
    const { count, data } = await this.productsService.findMany(prismaQuery);
    res.header("Content-Range", `${count}`);
    res.send(data);
  }

  @Get(":id")
  @ApiOkResponse({ type: ProductsEntity })
  @ApiQuery({ name: "crudQuery", required: false })
  async findOne(@Param("id") id: string) {
    const match = await this.productsService.findById(id);
    return match;
  }

  @Put(":id")
  @ApiCreatedResponse({ type: ProductsEntity })
  async update(@Param("id") id: string, @Body() createProductDto: CreateProductDto) {
    const created = await this.productsService.update(+id, createProductDto);
    return created;
  }

  @Delete(":id")
  @ApiOkResponse({ type: ProductsEntity })
  async remove(@Param("id") id: string) {
    return this.productsService.remove(+id);
  }
}
