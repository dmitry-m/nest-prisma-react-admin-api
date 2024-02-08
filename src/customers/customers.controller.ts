import { Controller, Get, Post, Body, Param, Delete, Header, Res, Put, Req } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from "@nestjs/swagger";
import { Request, Response } from "express";

import { CustomersEntity } from "./customers.entity";
import { QueryForCustomersPrisma } from "./customers.interface";
import { CustomersService } from "./customers.service";
import { CreateCustomerDto } from "./dto/create-customer.dto";

import { Auth } from "../auth/decorators/auth.decorator";
import { PrismaQuery } from "../prisma/prisma.decorator";

@ApiBearerAuth()
@ApiTags("customers")
@Controller("customers")
export class CustomersController {
  constructor(private customersService: CustomersService) {}

  @Post()
  @Auth("admin")
  @ApiCreatedResponse({ type: CustomersEntity })
  @ApiQuery({ name: "crudQuery", required: false })
  async create(@Body() createCustomerDto: CreateCustomerDto) {
    const created = await this.customersService.create(createCustomerDto);
    return created;
  }

  @Get()
  @Auth("admin")
  @ApiOkResponse({ type: CustomersEntity, isArray: true })
  @Header("Access-Control-Expose-Headers", "Content-Range")
  async findMany(
    @Res() res: Response,
    @Req() req: Request,
    @PrismaQuery() prismaQuery: QueryForCustomersPrisma,
  ) {
    const { count, data } = await this.customersService.findMany(prismaQuery);
    res.header("Content-Range", `${count}`);
    res.send(data);
  }

  @Get(":id")
  @Auth("admin")
  @ApiOkResponse({ type: CustomersEntity })
  @ApiQuery({ name: "crudQuery", required: false })
  async findOne(@Param("id") id: string) {
    const match = await this.customersService.findById(id);
    return match;
  }

  @Put(":id")
  @Auth("admin")
  @ApiCreatedResponse({ type: CustomersEntity })
  async update(@Param("id") id: string, @Body() createCustomerDto: CreateCustomerDto) {
    const created = await this.customersService.update(+id, createCustomerDto);
    return created;
  }

  @Delete(":id")
  @Auth("admin")
  @ApiOkResponse({ type: CustomersEntity })
  async remove(@Param("id") id: string) {
    return this.customersService.remove(+id);
  }
}
