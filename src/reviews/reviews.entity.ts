import { ApiProperty } from "@nestjs/swagger";

import { CreateReviewDto } from "./dto/create-review.dto";

export class ReviewEntity extends CreateReviewDto {
  @ApiProperty({ type: Number })
  id: number;
}
