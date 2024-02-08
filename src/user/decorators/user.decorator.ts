import { createParamDecorator, ExecutionContext } from "@nestjs/common";

import { User as UserModel } from "../user.entity";

type TypeData = keyof UserModel;

export const UserParam = createParamDecorator((data: TypeData, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<{ user: UserModel }>();
  const { user } = request;

  return data ? user?.[data] : user;
});
