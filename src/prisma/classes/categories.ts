import { Products } from "./products";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class Categories {
  @ApiProperty({ type: Number })
  id: number;

  @ApiPropertyOptional({ type: String })
  name?: string;

  @ApiProperty({ isArray: true, type: () => Products })
  products: Products[];
}
