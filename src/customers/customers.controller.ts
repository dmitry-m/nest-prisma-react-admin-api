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
  Query,
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

import { CustomerEntity } from "./customers.entity";
import { CustomersPrismaQuery } from "./customers.interface";
import { CustomersService } from "./customers.service";
import { CreateCustomerDto } from "./dto/create-customer.dto";
import { UpdateCustomerDto } from "./dto/update-customer.dto";

import { Auth } from "../auth/decorators/auth.decorator";
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
        throw new ConflictException(error.message.split(/\n/).pop());
      }
      throw error;
    }
  }

  @Get()
  @Auth("admin")
  @ApiOkResponse({ type: CustomerEntity, isArray: true })
  @Header("Access-Control-Expose-Headers", "Content-Range")
  @ApiQuery({ name: "customersQuery", required: false })
  async findMany(@Res() res: Response, @UrlToPrismaQuery() prismaQuery: CustomersPrismaQuery) {
    const { count, data } = await this.customersService.findMany(prismaQuery);
    res.header("Content-Range", `${count}`);
    res.send(data);
  }

  @Get(":id")
  @Auth("admin")
  @ApiOkResponse({ type: CustomerEntity })
  async findOne(@Param("id", ParseIntPipe) id: number) {
    const match = await this.customersService.findById(id);
    if (!match) throw new NotFoundException("Customer not found");

    return match;
  }

  @Put(":id")
  @Auth("admin")
  @ApiOkResponse({ type: CustomerEntity })
  @ApiBody({ type: UpdateCustomerDto })
  async update(@Param("id", ParseIntPipe) id: number, @Body() customerDto: UpdateCustomerDto) {
    try {
      const updated = await this.customersService.update(id, customerDto);
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
  @ApiOkResponse({ type: CustomerEntity })
  async remove(@Param("id", ParseIntPipe) id: number) {
    try {
      const deleted = await this.customersService.remove(id);
      return deleted;
    } catch (error) {
      throw new NotFoundException("Customer not found");
    }
  }
}
