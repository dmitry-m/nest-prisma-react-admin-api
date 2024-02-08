import {
  Body,
  Controller,
  Post,
  HttpCode,
  UseGuards,
  UnauthorizedException,
  ConflictException,
  Req,
  Res,
  Get,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ApiOkResponse, ApiBody } from "@nestjs/swagger";
import { Request, Response } from "express";

import { AuthInterface } from "./auth.interface";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto/auth.dto";
import { SwaggerLoginDto } from "./dto/swagger-login.dto";
import { LocalAuthGuard } from "./guards/local.guard";

import { UserParam } from "../user/decorators/user.decorator";
import { User } from "../user/user.entity";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly config: ConfigService) {}

  @Post("login")
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: SwaggerLoginDto })
  @ApiOkResponse({ description: "Tokens" })
  @HttpCode(200)
  async login(
    @UserParam() user: User,
    @Res({ passthrough: true }) response: Response,
  ): Promise<AuthInterface> {
    const { refreshToken, ...auth } = await this.authService.authenticate(user);
    const expires = this.config.get("REFRESH_TOKEN_DAYS") * 24 * 60 * 60 * 1000;
    response.cookie("refreshToken", refreshToken, {
      expires: new Date(Date.now() + expires),
      httpOnly: true,
    });

    return auth;
  }

  @Post("signup")
  @HttpCode(200)
  async signup(@Body() dto: AuthDto): Promise<AuthInterface> {
    try {
      const user = await this.authService.signup(dto);
      return user;
    } catch (error) {
      throw new ConflictException("User with this email is already registered");
    }
  }

  @Get("token")
  @HttpCode(200)
  async getNewTokens(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<AuthInterface> {
    try {
      const { refreshToken: oldToken } = request.cookies as { refreshToken: string };
      const { refreshToken, ...auth } = await this.authService.reNewAuth(oldToken);
      const expires = this.config.get("REFRESH_TOKEN_DAYS") * 24 * 60 * 60 * 1000;
      response.cookie("refreshToken", refreshToken, {
        expires: new Date(Date.now() + expires),
        httpOnly: true,
      });

      return auth;
    } catch (error) {
      throw new UnauthorizedException("Invalid token or expired");
    }
  }
}
