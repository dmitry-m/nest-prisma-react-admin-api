import { IsBoolean, IsEmail, IsString } from "class-validator";
import { CreateUserDto } from "./dto/create-user.dto";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class UserEntity extends CreateUserDto {
  @ApiProperty({ type: Number })
  id: number;
}

export class SafeUserEntity implements Omit<UserEntity, "password"> {
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
}
