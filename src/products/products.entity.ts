import { ApiProperty } from "@nestjs/swagger";

import { CreateProductDto } from "./dto/create-product.dto";

export class ProductEntity extends CreateProductDto {
  @ApiProperty({ type: Number })
  id: number;
}
