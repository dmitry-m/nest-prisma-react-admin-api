import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProductDto {
  @ApiProperty({ type: Number })
  @IsNumber()
  category_id: number;

  @ApiProperty({ type: String })
  @IsString()
  reference: string;

  @ApiProperty({ type: Number })
  @IsNumber()
  width: number;

  @ApiProperty({ type: Number })
  @IsNumber()
  height: number;

  @ApiProperty({ type: Number })
  @IsNumber()
  price: number;

  @ApiProperty({ type: String })
  @IsString()
  thumbnail: string;

  @ApiProperty({ type: String })
  @IsString()
  image: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ type: Number })
  @IsNumber()
  stock: number;

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @IsNumber()
  sales?: number;
}
