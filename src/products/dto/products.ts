import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Prisma } from "@prisma/client";

import { Categories } from "../../prisma/classes/categories";
import { Reviews } from "../../prisma/classes/reviews";

export class Products {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: Number })
  category_id: number;

  @ApiProperty({ type: () => Categories })
  category: Prisma.CategoriesCreateNestedOneWithoutProductsInput;

  @ApiPropertyOptional({ type: String })
  reference?: string;

  @ApiProperty({ type: Number })
  width: number;

  @ApiProperty({ type: Number })
  height: number;

  @ApiProperty({ type: Number })
  price: number;

  @ApiPropertyOptional({ type: String })
  thumbnail?: string;

  @ApiPropertyOptional({ type: String })
  image?: string;

  @ApiPropertyOptional({ type: String })
  description?: string;

  @ApiProperty({ type: Number })
  stock: number;

  @ApiProperty({ type: Number })
  sales: number;

  @ApiProperty({ isArray: true, type: () => Reviews })
  Reviews: Prisma.ReviewsCreateNestedManyWithoutProductInput;
}
