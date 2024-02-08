import { IsString } from "class-validator";

export class UpdatePassword {
  @IsString()
  password: string;

  @IsString()
  newPassword: string;
}
