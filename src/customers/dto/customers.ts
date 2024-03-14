/* eslint-disable max-classes-per-file */
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Prisma } from "@prisma/client";
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

import { CreateCustomerDto } from "./create-user.dto";

// import { Commands } from "../../prisma/classes/commands";
// import { Invoices } from "../../prisma/classes/invoices";
// import { Reviews } from "../../prisma/classes/reviews";

// export class CustomersDto {
//   @ApiProperty({ type: String })
//   @IsString()
//   first_name: string;

//   @ApiProperty({ type: String })
//   @IsString()
//   last_name: string;

//   @ApiProperty({ type: String })
//   @IsEmail()
//   email: string;

//   @ApiPropertyOptional({ type: String })
//   @IsOptional()
//   @IsString()
//   address?: string;

//   @ApiPropertyOptional({ type: String })
//   @IsOptional()
//   @IsString()
//   zipcode?: string;

//   @ApiPropertyOptional({ type: String })
//   @IsOptional()
//   @IsString()
//   city?: string;

//   @ApiPropertyOptional({ type: String })
//   @IsOptional()
//   @IsString()
//   avatar?: string;

//   @ApiProperty({ type: Date })
//   @IsDateString()
//   birthday: Date;

//   @ApiProperty({ type: Date })
//   @IsDateString()
//   first_seen: Date;

//   @ApiProperty({ type: Date })
//   @IsDateString()
//   last_seen: Date;

//   @ApiProperty({ type: Boolean })
//   @IsBoolean()
//   has_ordered: boolean;

//   @ApiPropertyOptional({ type: String })
//   @IsOptional()
//   @IsString()
//   stateAbbr?: string;

//   @ApiProperty({ type: Date })
//   @IsDateString()
//   latest_purchase: Date;

//   @ApiProperty({ type: Boolean })
//   @IsBoolean()
//   has_newsletter: boolean;

//   @ApiProperty({ isArray: true, type: String })
//   @IsOptional()
//   @IsArray()
//   groups: string[];

//   @ApiProperty({ type: Number })
//   @IsNumber()
//   nb_commands: number;

//   @ApiProperty({ type: Number })
//   @IsNumber()
//   total_spent: number;
// }

export class CustomersResponse extends CreateCustomerDto {
  @ApiProperty({ type: Number })
  id: number;

  // @ApiProperty({ isArray: true, type: () => Commands })
  // commands?: Prisma.CommandsCreateNestedManyWithoutCustomerInput;

  // @ApiProperty({ isArray: true, type: () => Invoices })
  // invoices?: Prisma.InvoicesCreateNestedManyWithoutCustomerInput;

  // @ApiProperty({ isArray: true, type: () => Reviews })
  // reviews?: Prisma.ReviewsCreateNestedManyWithoutCustomerInput;
}
