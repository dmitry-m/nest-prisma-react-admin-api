import { ApiProperty } from "@nestjs/swagger";

import { CreateCommandDto } from "./dto/create-command.dto";

export class CommandEntity extends CreateCommandDto {
  @ApiProperty({ type: Number })
  id: number;
}
