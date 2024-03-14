import { Customers } from "./customers";
import { Invoices } from "./invoices";
import { Reviews } from "./reviews";
import { CommandsStatus } from "@prisma/client";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class Commands {
  @ApiProperty({ type: Number })
  id: number;

  @ApiPropertyOptional({ type: String })
  reference?: string;

  @ApiProperty({ type: Date })
  date: Date;

  @ApiProperty({ type: Number })
  customer_id: number;

  @ApiProperty({ type: () => Customers })
  customer: Customers;

  @ApiPropertyOptional({ type: Object })
  basket?: object;

  @ApiProperty({ type: Number })
  total_ex_taxes: number;

  @ApiProperty({ type: Number })
  delivery_fees: number;

  @ApiProperty({ type: Number })
  tax_rate: number;

  @ApiProperty({ type: Number })
  taxes: number;

  @ApiProperty({ type: Number })
  total: number;

  @ApiProperty({ enum: CommandsStatus, enumName: "CommandsStatus" })
  status: CommandsStatus = CommandsStatus.ORDERED;

  @ApiProperty({ type: Boolean })
  returned: boolean;

  @ApiPropertyOptional({ type: () => Invoices })
  invoice?: Invoices;

  @ApiProperty({ isArray: true, type: () => Reviews })
  Reviews: Reviews[];
}
