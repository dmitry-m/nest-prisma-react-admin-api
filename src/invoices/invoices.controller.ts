import { Controller, Get, Post, Body, Param, Delete, Header, Res, Put, Req } from "@nestjs/common";
import { ApiCreatedResponse, ApiOkResponse, ApiQuery } from "@nestjs/swagger";
import { Request, Response } from "express";

import { CreateInvoiceDto } from "./dto/create-invoice.dto";
import { InvoicesEntity } from "./invoices.entity";
import { QueryForInvoicesPrisma } from "./invoices.interface";
import { InvoicesService } from "./invoices.service";
// import { QueryForInvoicesPrisma } from "./invoices.service.spec";

import { UrlToPrismaQuery } from "../prisma/prisma.decorator";

@Controller("invoices")
export class InvoicesController {
  constructor(private invoicesService: InvoicesService) {}

  @Post()
  @ApiCreatedResponse({ type: InvoicesEntity })
  @ApiQuery({ name: "crudQuery", required: false })
  async create(@Body() createInvoiceDto: CreateInvoiceDto) {
    const created = await this.invoicesService.create(createInvoiceDto);
    return created;
  }

  @Get()
  @ApiOkResponse({ type: InvoicesEntity, isArray: true })
  @Header("Access-Control-Expose-Headers", "Content-Range")
  async findMany(
    @Res() res: Response,
    @Req() req: Request,
    @UrlToPrismaQuery() prismaQuery: QueryForInvoicesPrisma,
  ) {
    const { count, data } = await this.invoicesService.findMany(prismaQuery);
    res.header("Content-Range", `${count}`);
    res.send(data);
  }

  @Get(":id")
  @ApiOkResponse({ type: InvoicesEntity })
  @ApiQuery({ name: "crudQuery", required: false })
  async findOne(@Param("id") id: string) {
    const match = await this.invoicesService.findById(id);
    return match;
  }

  @Put(":id")
  @ApiCreatedResponse({ type: InvoicesEntity })
  async update(@Param("id") id: string, @Body() createInvoiceDto: CreateInvoiceDto) {
    const created = await this.invoicesService.update(+id, createInvoiceDto);
    return created;
  }

  @Delete(":id")
  @ApiOkResponse({ type: InvoicesEntity })
  async remove(@Param("id") id: string) {
    return this.invoicesService.remove(+id);
  }
}
