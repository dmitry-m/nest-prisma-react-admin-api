import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsString } from "class-validator";

export class CreateUserDto {
  @ApiProperty({ type: String })
  @IsEmail()
  email: string;

  @ApiProperty({ type: String })
  @IsString()
  password: string;

  @ApiPropertyOptional({ type: String })
  @IsString()
  name?: string;

  @ApiPropertyOptional({ type: String })
  @IsString()
  avatar?: string;

  @ApiPropertyOptional({ type: String })
  @IsString()
  role?: string = "user";

  @ApiPropertyOptional({ type: Boolean })
  @IsBoolean()
  is_admin?: boolean = false;
}
