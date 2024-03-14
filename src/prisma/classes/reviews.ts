import { Commands } from "./commands";
import { Products } from "./products";
import { Customers } from "./customers";
import { ReviewStatus } from "@prisma/client";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class Reviews {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: Date })
  date: Date;

  @ApiProperty({ enum: ReviewStatus, enumName: "ReviewStatus" })
  status: ReviewStatus = ReviewStatus.PENDING;

  @ApiProperty({ type: Number })
  command_id: number;

  @ApiProperty({ type: () => Commands })
  command: Commands;

  @ApiProperty({ type: Number })
  product_id: number;

  @ApiProperty({ type: () => Products })
  product: Products;

  @ApiProperty({ type: Number })
  customer_id: number;

  @ApiProperty({ type: () => Customers })
  customer: Customers;

  @ApiProperty({ type: Number })
  rating: number;

  @ApiPropertyOptional({ type: String })
  comment?: string;
}
