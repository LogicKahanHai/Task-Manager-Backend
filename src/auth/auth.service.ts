import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Env } from 'src/utils/environment';
import { HashingService } from 'src/utils/services/hashing.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly hashingService: HashingService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userService.findByEmail(email);
    if (
      user &&
      (await this.hashingService.comparePassword(password, user.password))
    ) {
      return user;
    }
    return null;
  }

  async registerUser(createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    const tokens = await this.generateTokens(user.id);
    return {
      ...user,
      ...tokens,
    };
  }

  async login(user: User) {
    const tokens = await this.generateTokens(user.id);

    return {
      ...user,
      ...tokens,
    };
  }

  private async generateTokens(
    userId: string,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const payload = { id: userId };

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: this.configService.get(Env.jwt.access.expire),
      secret: this.configService.get<string>(Env.jwt.access.secret),
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: this.configService.get(Env.jwt.refresh.expire),
      secret: this.configService.get<string>(Env.jwt.refresh.secret),
    });

    const hashedRefreshToken =
      await this.hashingService.hashPassword(refreshToken);

    await this.userService.saveRefreshToken(userId, hashedRefreshToken);

    return { access_token: accessToken, refresh_token: refreshToken };
  }

  async logout(id: string) {
    return { logout: await this.userService.logoutUser(id) };
  }
}
