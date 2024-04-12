import { ApiProperty } from "@nestjs/swagger";

import { CreateCategoryDto } from "./dto/create-category.dto";

export class CategoryEntity extends CreateCategoryDto {
  @ApiProperty({ type: Number })
  id: number;
}
