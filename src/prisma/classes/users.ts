import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class Users {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  email: string;

  @ApiProperty({ type: String })
  password: string;

  @ApiPropertyOptional({ type: String })
  fullName?: string;

  @ApiPropertyOptional({ type: String })
  avatar?: string;

  @ApiPropertyOptional({ type: String })
  role?: string = "user";

  @ApiPropertyOptional({ type: Boolean })
  isAdmin?: boolean;
}
