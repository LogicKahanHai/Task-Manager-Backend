import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { HashingService } from 'src/utils/services/hashing.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Env } from 'src/utils/environment';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>(Env.jwt.access.secret),
        signOptions: {
          expiresIn: configService.getOrThrow(Env.jwt.access.expire),
        },
      }),
    }),
  ],
  providers: [AuthService, HashingService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
