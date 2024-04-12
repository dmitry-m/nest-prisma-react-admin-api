import { ApiProperty } from "@nestjs/swagger";

import { CreateCustomerDto } from "./dto/create-customer.dto";

export class CustomerEntity extends CreateCustomerDto {
  @ApiProperty({ type: Number })
  id: number;
}
