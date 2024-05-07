import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

import { CreateInvoiceDto } from "./dto/create-invoice.dto";
import { UpdateInvoiceDto } from "./dto/update-invoice.dto";
import { InvoicesPrismaQuery } from "./invoices.interface";

import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class InvoicesService {
  constructor(private prismaService: PrismaService) {}

  public async create(createInvoiceDto: CreateInvoiceDto) {
    return this.prismaService.invoices.create({
      data: { ...createInvoiceDto, date: new Date(createInvoiceDto.date) },
    });
  }

  async findMany(prismaQuery: InvoicesPrismaQuery) {
    const invoicesQuery: Prisma.InvoicesFindManyArgs = prismaQuery;

    const [count, data] = await this.prismaService.$transaction([
      this.prismaService.invoices.count({ where: invoicesQuery.where }),
      this.prismaService.invoices.findMany(invoicesQuery),
    ]);

    return { count, data };
  }

  async findById(id: number) {
    const data = await this.prismaService.invoices.findFirst({
      where: { id },
    });

    return data;
  }

  async update(id: number, updateInvoiceDto: UpdateInvoiceDto) {
    return this.prismaService.invoices.update({
      where: { id },
      data: updateInvoiceDto,
    });
  }

  remove(id: number) {
    return this.prismaService.invoices.delete({ where: { id } });
  }
}
