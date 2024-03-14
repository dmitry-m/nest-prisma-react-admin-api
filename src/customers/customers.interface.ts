import { ApiProperty } from "@nestjs/swagger";
import { Prisma } from "@prisma/client";

import { CreateCustomerDto } from "./dto/create-user.dto";

export interface CustomersPrismaQuery extends Prisma.CustomersFindManyArgs {
  where: Prisma.CustomersWhereInput & {
    search?: string;
  };
}

export class CustomerEntity extends CreateCustomerDto {
  @ApiProperty({ type: Number })
  id: number;
}
