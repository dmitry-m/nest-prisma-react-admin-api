import { ApiProperty } from "@nestjs/swagger";
import { ReviewStatus } from "@prisma/client";
import { IsDateString, IsNumber, IsString } from "class-validator";

export class CreateReviewDto {
  @ApiProperty({ type: Date })
  @IsDateString()
  date: Date;

  @ApiProperty({ enum: ReviewStatus, enumName: "ReviewStatus" })
  @IsString()
  status: ReviewStatus = ReviewStatus.PENDING;

  @ApiProperty({ type: Number })
  @IsNumber()
  command_id: number;

  @ApiProperty({ type: Number })
  @IsNumber()
  product_id: number;

  @ApiProperty({ type: Number })
  @IsNumber()
  customer_id: number;

  @ApiProperty({ type: Number })
  @IsNumber()
  rating: number;

  @ApiProperty({ type: String })
  @IsString()
  comment: string;
}
