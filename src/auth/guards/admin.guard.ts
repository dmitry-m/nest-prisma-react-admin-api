import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

import { UserEntity } from "../../user/user.entity";

@Injectable()
export class OnlyAdminGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<{ user: UserEntity }>();
    const { user } = request;

    if (!user.is_admin) throw new ForbiddenException("You have no rights!");

    return user.is_admin;
  }
}
