import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayloadDto } from 'src/user/dto/jwt-payload.dto';
import { UserService } from 'src/user/user.service';
import { Env } from 'src/utils/environment';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    private readonly config: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.getOrThrow<string>(Env.jwt.refresh.secret),
    });
  }

  async validate(payload: JwtPayloadDto) {
    const user = await this.userService.findOne(payload.id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!user.refreshToken) {
      throw new UnauthorizedException(
        'Refresh token not found, please log in again',
      );
    }

    return user;
  }
}
