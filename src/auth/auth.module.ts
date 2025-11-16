import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { HashingService } from 'src/utils/services/hashing.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [UserModule, PassportModule],
  providers: [AuthService, HashingService, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
