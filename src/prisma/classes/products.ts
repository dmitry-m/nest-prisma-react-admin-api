import { Categories } from "./categories";
import { Reviews } from "./reviews";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class Products {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: Number })
  category_id: number;

  @ApiProperty({ type: () => Categories })
  category: Categories;

  @ApiProperty({ type: String })
  reference: string;

  @ApiProperty({ type: Number })
  width: number;

  @ApiProperty({ type: Number })
  height: number;

  @ApiProperty({ type: Number })
  price: number;

  @ApiProperty({ type: String })
  thumbnail: string;

  @ApiProperty({ type: String })
  image: string;

  @ApiPropertyOptional({ type: String })
  description?: string;

  @ApiProperty({ type: Number })
  stock: number;

  @ApiPropertyOptional({ type: Number })
  sales?: number;

  @ApiProperty({ isArray: true, type: () => Reviews })
  Reviews: Reviews[];
}
