import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateCategoryDto {
  @ApiPropertyOptional({ type: String })
  @IsString()
  name: string;
}
