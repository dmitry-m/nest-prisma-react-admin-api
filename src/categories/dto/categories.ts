import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Prisma } from "@prisma/client";

import { Products } from "../../prisma/classes/products";

export class Categories {
  @ApiProperty({ type: Number })
  id: number;

  @ApiPropertyOptional({ type: String })
  name: string;

  @ApiProperty({ isArray: true, type: () => Products })
  products: Prisma.ProductsCreateNestedManyWithoutCategoryInput;
}
