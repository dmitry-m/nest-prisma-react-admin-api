import { Products } from "./products";
import { ApiProperty } from "@nestjs/swagger";

export class Categories {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ isArray: true, type: () => Products })
  products: Products[];
}
