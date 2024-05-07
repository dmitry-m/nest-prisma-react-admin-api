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

import { CreateInvoiceDto } from "./dto/create-invoice.dto";
import { UpdateInvoiceDto } from "./dto/update-invoice.dto";
import { InvoiceEntity } from "./invoices.entity";
import { InvoicesPrismaQuery } from "./invoices.interface";
import { InvoicesService } from "./invoices.service";

import { Auth } from "../auth/decorators/auth.decorator";
import { UrlToPrismaQuery } from "../prisma/prisma.decorator";

@ApiBearerAuth()
@ApiTags("Invoices")
@Controller("invoices")
export class InvoicesController {
  constructor(private invoicesService: InvoicesService) {}

  @Post()
  @Auth("admin")
  @HttpCode(201)
  @ApiCreatedResponse({ type: InvoiceEntity })
  @ApiBody({ type: CreateInvoiceDto })
  async create(@Body() invoiceDto: CreateInvoiceDto) {
    try {
      const created = await this.invoicesService.create(invoiceDto);
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
  @ApiOkResponse({ type: InvoiceEntity, isArray: true })
  @Header("Access-Control-Expose-Headers", "Content-Range")
  @ApiQuery({ name: "invoicesQuery", required: false })
  async findMany(@Res() res: Response, @UrlToPrismaQuery() prismaQuery: InvoicesPrismaQuery) {
    const { count, data } = await this.invoicesService.findMany(prismaQuery);
    res.header("Content-Range", `${count}`);
    res.send(data);
  }

  @Get(":id")
  @Auth("admin")
  @ApiOkResponse({ type: InvoiceEntity })
  async findOne(@Param("id", ParseIntPipe) id: number) {
    const match = await this.invoicesService.findById(id);
    if (!match) throw new NotFoundException("Invoice not found");

    return match;
  }

  @Put(":id")
  @Auth("admin")
  @ApiOkResponse({ type: InvoiceEntity })
  @ApiBody({ type: UpdateInvoiceDto })
  async update(@Param("id", ParseIntPipe) id: number, @Body() invoiceDto: UpdateInvoiceDto) {
    try {
      const updated = await this.invoicesService.update(id, invoiceDto);
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
  @ApiOkResponse({ type: InvoiceEntity })
  async remove(@Param("id", ParseIntPipe) id: number) {
    try {
      const deleted = await this.invoicesService.remove(id);
      return deleted;
    } catch (error) {
      throw new NotFoundException("Invoice not found");
    }
  }
}
