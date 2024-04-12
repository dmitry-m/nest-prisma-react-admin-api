import { ApiProperty } from "@nestjs/swagger";

import { CreateReviewDto } from "./dto/create-reviews.dto";

export class ReviewsEntity extends CreateReviewDto {
  @ApiProperty({ type: Number })
  id: number;
}
