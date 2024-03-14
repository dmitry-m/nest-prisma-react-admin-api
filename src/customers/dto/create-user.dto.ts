/* eslint-disable max-classes-per-file */
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

export class CreateCustomerDto {
  @ApiProperty({ type: String })
  @IsString()
  first_name: string;

  @ApiProperty({ type: String })
  @IsString()
  last_name: string;

  @ApiProperty({ type: String })
  @IsEmail()
  email: string;

  @ApiProperty({ type: String })
  @IsString()
  password: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  zipcode?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  avatar?: string;

  @ApiProperty({ type: Date })
  @IsOptional()
  @IsDateString()
  birthday?: Date;

  @ApiProperty({ type: Date })
  @IsOptional()
  @IsDateString()
  first_seen?: Date;

  @ApiProperty({ type: Date })
  @IsOptional()
  @IsDateString()
  last_seen?: Date;

  @ApiProperty({ type: Boolean })
  @IsOptional()
  @IsBoolean()
  has_ordered?: boolean;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  stateAbbr?: string;

  @ApiProperty({ type: Date })
  @IsOptional()
  @IsDateString()
  latest_purchase?: Date;

  @ApiProperty({ type: Boolean })
  @IsOptional()
  @IsBoolean()
  has_newsletter?: boolean;

  @ApiProperty({ isArray: true, type: String })
  @IsOptional()
  @IsArray()
  groups?: string[];

  @ApiProperty({ type: Number })
  @IsOptional()
  @IsNumber()
  nb_commands?: number;

  @ApiProperty({ type: Number })
  @IsOptional()
  @IsNumber()
  total_spent?: number;
}
