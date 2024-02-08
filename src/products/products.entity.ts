import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class ProductsEntity {
  @ApiProperty({ type: Number })
  id: number;

  @ApiPropertyOptional({ type: String })
  first_name?: string;

  @ApiPropertyOptional({ type: String })
  last_name?: string;

  @ApiPropertyOptional({ type: String })
  email?: string;

  @ApiPropertyOptional({ type: String })
  address?: string;

  @ApiPropertyOptional({ type: String })
  zipcode?: string;

  @ApiPropertyOptional({ type: String })
  city?: string;

  @ApiPropertyOptional({ type: String })
  avatar?: string;

  @ApiProperty({ type: Date })
  birthday: Date;

  @ApiProperty({ type: Date })
  first_seen: Date;

  @ApiProperty({ type: Date })
  last_seen: Date;

  @ApiProperty({ type: Boolean })
  has_ordered: boolean;

  @ApiProperty({ type: Date })
  latest_purchase: Date;

  @ApiProperty({ type: Boolean })
  has_newsletter: boolean;

  @ApiProperty({ isArray: true, type: String })
  groups: string[];

  @ApiProperty({ type: Number })
  nb_commands: number;

  @ApiProperty({ type: Number })
  total_spent: number;
}
