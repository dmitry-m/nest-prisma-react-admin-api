import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { UserEntity } from "../user/user.entity";
import { IsBoolean, IsEmail, IsString } from "class-validator";

export type TypeRole = "admin" | "user" | undefined;

export class AuthInterface implements Omit<UserEntity, "password"> {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  @IsEmail()
  email: string;

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

  @ApiProperty({ type: String })
  accessToken: string;
}
