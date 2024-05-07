/* eslint-disable max-classes-per-file */
import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNumber } from "class-validator";

export class CreateInvoiceDto {
  @ApiProperty({ type: Date })
  @IsDateString()
  date: Date;

  @ApiProperty({ type: Number })
  @IsNumber()
  command_id: number;

  @ApiProperty({ type: Number })
  @IsNumber()
  customer_id: number;

  @ApiProperty({ type: Number })
  @IsNumber()
  total_ex_taxes: number;

  @ApiProperty({ type: Number })
  @IsNumber()
  delivery_fees: number;

  @ApiProperty({ type: Number })
  @IsNumber()
  tax_rate: number;

  @ApiProperty({ type: Number })
  @IsNumber()
  taxes: number;

  @ApiProperty({ type: Number })
  @IsNumber()
  total: number;
}
