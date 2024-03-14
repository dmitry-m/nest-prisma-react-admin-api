import { Commands } from "./commands";
import { Invoices } from "./invoices";
import { Reviews } from "./reviews";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class Customers {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  first_name: string;

  @ApiProperty({ type: String })
  last_name: string;

  @ApiProperty({ type: String })
  email: string;

  @ApiProperty({ type: String })
  password: string;

  @ApiPropertyOptional({ type: String })
  address?: string;

  @ApiPropertyOptional({ type: String })
  zipcode?: string;

  @ApiPropertyOptional({ type: String })
  city?: string;

  @ApiPropertyOptional({ type: String })
  avatar?: string;

  @ApiPropertyOptional({ type: Date })
  birthday?: Date;

  @ApiPropertyOptional({ type: Date })
  first_seen?: Date;

  @ApiPropertyOptional({ type: Date })
  last_seen?: Date;

  @ApiPropertyOptional({ type: Boolean })
  has_ordered?: boolean;

  @ApiPropertyOptional({ type: String })
  stateAbbr?: string;

  @ApiPropertyOptional({ type: Date })
  latest_purchase?: Date;

  @ApiPropertyOptional({ type: Boolean })
  has_newsletter?: boolean = true;

  @ApiProperty({ isArray: true, type: String })
  groups: string[] = [];

  @ApiPropertyOptional({ type: Number })
  nb_commands?: number;

  @ApiPropertyOptional({ type: Number })
  total_spent?: number;

  @ApiProperty({ isArray: true, type: () => Commands })
  commands: Commands[];

  @ApiProperty({ isArray: true, type: () => Invoices })
  invoices: Invoices[];

  @ApiProperty({ isArray: true, type: () => Reviews })
  reviews: Reviews[];
}
