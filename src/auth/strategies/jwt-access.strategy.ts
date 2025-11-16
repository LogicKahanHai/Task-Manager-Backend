import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayloadDto } from 'src/user/dto/jwt-payload.dto';
import { UserService } from 'src/user/user.service';
import { Env } from 'src/utils/environment';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly config: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.getOrThrow<string>(Env.jwt.access.secret),
    });
  }

  async validate(payload: JwtPayloadDto) {
    const user = await this.userService.findOne(payload.id);
    if (!user) {
      return null;
    }
    if (!user.refreshToken) {
      return null;
    }
    return user;
  }
}
