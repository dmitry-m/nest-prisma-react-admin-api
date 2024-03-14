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

import { CustomerEntity, CustomersPrismaQuery } from "./customers.interface";
import { CustomersService } from "./customers.service";
import { CreateCustomerDto } from "./dto/create-user.dto";
import { CustomersResponse } from "./dto/customers";
import { UpdateCustomerDto } from "./dto/update-user.dto";

import { Auth } from "../auth/decorators/auth.decorator";
import { Customers } from "../prisma/classes/customers";
import { UrlToPrismaQuery } from "../prisma/prisma.decorator";

@ApiBearerAuth()
@ApiTags("Customers")
@Controller("customers")
export class CustomersController {
  constructor(private customersService: CustomersService) {}

  @Post()
  @Auth("admin")
  @HttpCode(201)
  @ApiCreatedResponse({ type: CustomerEntity })
  @ApiBody({ type: CreateCustomerDto })
  async create(@Body() customerDto: CreateCustomerDto) {
    try {
      const created = await this.customersService.create(customerDto);
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
  @ApiOkResponse({ type: Customers, isArray: true })
  @Header("Access-Control-Expose-Headers", "Content-Range")
  @ApiQuery({ name: "customersQuery", required: false })
  async findMany(@Res() res: Response, @UrlToPrismaQuery() prismaQuery: CustomersPrismaQuery) {
    const { count, data } = await this.customersService.findMany(prismaQuery);
    res.header("Content-Range", `${count}`);
    res.send(data);
  }

  @Get(":id")
  @Auth("admin")
  @ApiOkResponse({ type: Customers })
  async findOne(@Param("id", ParseIntPipe) id: number) {
    const match = await this.customersService.findById(id);
    return match;
  }

  @Put(":id")
  @Auth("admin")
  @ApiOkResponse({ type: CustomersResponse })
  @ApiBody({ type: UpdateCustomerDto })
  async update(@Param("id", ParseIntPipe) id: number, @Body() customerDto: UpdateCustomerDto) {
    try {
      const updated = await this.customersService.update(id, customerDto);
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
  @ApiOkResponse({ type: CustomersResponse })
  async remove(@Param("id", ParseIntPipe) id: number) {
    try {
      const deleted = await this.customersService.remove(id);
      return deleted;
    } catch (error) {
      throw new NotFoundException("User not found");
    }
  }
}
