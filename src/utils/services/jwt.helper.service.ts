import { ConfigService } from '@nestjs/config';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { JwtPayloadDto } from 'src/user/dto/jwt-payload.dto';
import { Env } from '../environment';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtHelperService {
  constructor(
    private readonly config: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  private generateToken(
    payload: JwtPayloadDto,
    signOptions: JwtSignOptions,
  ): string {
    return this.jwtService.sign(payload, signOptions);
  }

  private getSignOptions(isAccessToken: boolean = true): JwtSignOptions {
    return isAccessToken
      ? {
          secret: this.config.getOrThrow<string>(Env.jwt.access.secret),
          expiresIn: this.config.getOrThrow(Env.jwt.access.expire),
        }
      : {
          secret: this.config.getOrThrow<string>(Env.jwt.refresh.secret),
          expiresIn: this.config.getOrThrow(Env.jwt.refresh.expire),
        };
  }

  generateAccessToken(payload: JwtPayloadDto): string {
    const signOptions = this.getSignOptions();
    return this.generateToken(payload, signOptions);
  }

  generateRefreshToken(payload: JwtPayloadDto): string {
    const signOptions = this.getSignOptions(false);
    return this.generateToken(payload, signOptions);
  }
}
