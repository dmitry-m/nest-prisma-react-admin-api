import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator";

export class SwaggerLoginDto {
  @IsString()
  @ApiProperty({ type: String })
  username: string;

  @MinLength(6, { message: "Password cannot be less than 6 characters" })
  @IsString()
  @ApiProperty({ type: String })
  password: string;
}
