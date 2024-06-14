import { createParamDecorator, ExecutionContext } from "@nestjs/common";

import { UserEntity } from "../user.entity";

type TypeData = keyof UserEntity;

export const UserParam = createParamDecorator((data: TypeData, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<{ user: UserEntity }>();
  const { user } = request;

  return data ? user?.[data] : user;
});
