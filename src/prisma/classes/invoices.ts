import { Commands } from "./commands";
import { Customers } from "./customers";
import { ApiProperty } from "@nestjs/swagger";

export class Invoices {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: Date })
  date: Date;

  @ApiProperty({ type: Number })
  command_id: number;

  @ApiProperty({ type: () => Commands })
  command: Commands;

  @ApiProperty({ type: Number })
  customer_id: number;

  @ApiProperty({ type: () => Customers })
  customer: Customers;

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
}
