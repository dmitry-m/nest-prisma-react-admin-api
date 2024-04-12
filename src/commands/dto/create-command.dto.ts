/* eslint-disable max-classes-per-file */
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { CommandsStatus, Prisma } from "@prisma/client";
import { IsBoolean, IsDateString, IsOptional, IsString } from "class-validator";

import { CustomerEntity } from "../../customers/customers.entity";

export class CreateCommandDto {
  @ApiProperty({ type: String })
  @IsString()
  reference: string;

  @ApiPropertyOptional({ type: Date })
  @IsOptional()
  @IsDateString()
  date?: Date;

  @ApiProperty({ type: Number })
  @IsBoolean()
  command_id: number;

  @ApiProperty({ type: () => CustomerEntity })
  customer: Prisma.CustomersCreateNestedOneWithoutCommandsInput;

  @ApiProperty({ type: Object })
  basket: object;

  @ApiProperty({ type: Number })
  @IsBoolean()
  total_ex_taxes: number;

  @ApiProperty({ type: Number })
  @IsBoolean()
  delivery_fees: number;

  @ApiProperty({ type: Number })
  @IsBoolean()
  tax_rate: number;

  @ApiProperty({ type: Number })
  @IsBoolean()
  taxes: number;

  @ApiProperty({ type: Number })
  @IsBoolean()
  total: number;

  @ApiProperty({ enum: CommandsStatus, enumName: "CommandsStatus" })
  @IsString()
  status: CommandsStatus = CommandsStatus.ORDERED;

  @ApiProperty({ type: Boolean })
  @IsBoolean()
  returned: boolean;
}
