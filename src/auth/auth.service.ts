import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { compare, genSalt, hash } from "bcryptjs";

import { AuthInterface } from "./auth.interface";
import { AuthDto } from "./dto/auth.dto";

import { SafeUserEntity, UserEntity } from "../user/user.entity";
import { UserService } from "../user/user.service";
// import { UpdatePassword } from "./dto/password.dto";

export function excludeFromList<T, K extends keyof T>(
  objects: T[],
  keysToDelete: K[],
): Omit<T, K>[] {
  return objects.map((obj) => exclude(obj, keysToDelete)) as Omit<T, K>[];
}

export function exclude<T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !keys.includes(key as K)),
  ) as Omit<T, K>;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly config: ConfigService,
  ) {}

  async issueJwtTokens(id: number) {
    const data = { id };
    const refreshTokenExpires: string = this.config.get("REFRESH_TOKEN_DAYS");
    const accessTokenExpires: string = this.config.get("ACCESS_TOKEN_MINUTES");

    const refreshToken = await this.jwtService.signAsync(data, {
      expiresIn: `${refreshTokenExpires}d`,
    });
    const accessToken = await this.jwtService.signAsync(data, {
      expiresIn: `${accessTokenExpires}m`,
    });

    return { refreshToken, accessToken };
  }

  public async validateUser({ username, password }: AuthDto): Promise<SafeUserEntity | null> {
    const user: UserEntity = await this.userService.getByEmail(username);
    if (!user) return null;

    const passwordValid = await compare(password, user.password);

    return passwordValid ? exclude(user, ["password"]) : null;
  }

  public async authenticate(user: UserEntity): Promise<AuthInterface & { refreshToken: string }> {
    const { accessToken, refreshToken } = await this.issueJwtTokens(user.id);

    return {
      ...exclude(user, ["password"]),
      accessToken,
      refreshToken,
    };
  }

  public async signup({ username, password }: AuthDto) {
    const user = await this.userService.create({ email: username, password });
    return this.authenticate(user);
  }

  public async reNewAuth(refreshToken: string) {
    const { id }: UserEntity = await this.jwtService.verifyAsync(refreshToken);
    const user = await this.userService.getById(id);

    return this.authenticate(user);
  }

  // public async updatePassword(
  //   id: number,
  //   { password, newPassword }: UpdatePassword,
  // ): Promise<UserEntity> {
  //   const data = await this.userService.getById(id);
  //   const passwordValid = await compare(password, data.password);

  //   if (!passwordValid) {
  //     return null;
  //   }

  //   data.password = await hash(newPassword, await genSalt(10));

  //   return this.userService.update(data.id, data);
  // }
}
