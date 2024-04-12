import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcryptjs";

import { AuthInterface } from "./auth.interface";
import { AuthDto } from "./dto/auth.dto";

import { User } from "../user/user.entity";
import { UserService } from "../user/user.service";

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

  public async validateUser({ username, password }: AuthDto): Promise<User> {
    const user: User = await this.userService.getByEmail(username);
    if (!user) return null;

    const passwordValid = await compare(password, user.password);
    delete user.password;

    return passwordValid ? user : null;
  }

  public async authenticate(user: User): Promise<AuthInterface & { refreshToken: string }> {
    const { accessToken, refreshToken } = await this.issueJwtTokens(user.id);
    const { password, ...data } = user;

    return {
      ...data,
      accessToken,
      refreshToken,
    };
  }

  public async signup({ username, password }: AuthDto) {
    const user = await this.userService.create({ email: username, password });
    return this.authenticate(user);
  }

  public async reNewAuth(refreshToken: string) {
    const { id }: User = await this.jwtService.verifyAsync(refreshToken);
    const user = await this.userService.getById(id);

    return this.authenticate(user);
  }
}
