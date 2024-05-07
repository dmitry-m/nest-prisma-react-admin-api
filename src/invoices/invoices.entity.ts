import { ApiProperty } from "@nestjs/swagger";

import { CreateInvoiceDto } from "./dto/create-invoice.dto";

export class InvoiceEntity extends CreateInvoiceDto {
  @ApiProperty({ type: Number })
  id: number;
}
