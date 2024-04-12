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

import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { ProductEntity } from "./products.entity";
import { ProductPrismaQuery } from "./products.interface";
import { ProductsService } from "./products.service";

import { Auth } from "../auth/decorators/auth.decorator";
import { UrlToPrismaQuery } from "../prisma/prisma.decorator";

@ApiBearerAuth()
@ApiTags("Products")
@Controller("products")
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Post()
  @Auth("admin")
  @HttpCode(201)
  @ApiCreatedResponse({ type: ProductEntity })
  @ApiBody({ type: CreateProductDto })
  async create(@Body() productDto: CreateProductDto) {
    try {
      const created = await this.productsService.create(productDto);
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
  @ApiOkResponse({ type: ProductEntity, isArray: true })
  @Header("Access-Control-Expose-Headers", "Content-Range")
  @ApiQuery({ name: "productsQuery", required: false })
  async findMany(@Res() res: Response, @UrlToPrismaQuery() prismaQuery: ProductPrismaQuery) {
    const { count, data } = await this.productsService.findMany(prismaQuery);
    res.header("Content-Range", `${count}`);
    res.send(data);
  }

  @Get(":id")
  @Auth("admin")
  @ApiOkResponse({ type: ProductEntity })
  async findOne(@Param("id", ParseIntPipe) id: number) {
    const match = await this.productsService.findById(id);
    return match;
  }

  @Put(":id")
  @Auth("admin")
  @ApiOkResponse({ type: ProductEntity })
  @ApiBody({ type: UpdateProductDto })
  async update(@Param("id", ParseIntPipe) id: number, @Body() productDto: UpdateProductDto) {
    try {
      const updated = await this.productsService.update(id, productDto);
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
  @ApiOkResponse({ type: ProductEntity })
  async remove(@Param("id", ParseIntPipe) id: number) {
    try {
      const deleted = await this.productsService.remove(id);
      return deleted;
    } catch (error) {
      throw new NotFoundException("User not found");
    }
  }
}
