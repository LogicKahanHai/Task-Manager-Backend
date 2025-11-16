import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  UseInterceptors,
  Get,
} from '@nestjs/common';
import { LocalAuthGuard } from './guards/local.guard';
import type { AuthenticatedRequest } from 'src/utils/types/authenticated.request.type';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { ResponseInterceptor } from 'src/utils/interceptors/response.interceptor';
import { AuthResponseDto } from './dtos/response.dto';
import { JwtRefreshAuthGuard } from './guards/jwt-refresh.guard';
import { JwtAccessAuthGuard } from './guards/jwt-access.guard';

@Controller('auth')
@UseInterceptors(new ResponseInterceptor(AuthResponseDto))
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @Public()
  async login(@Request() req: AuthenticatedRequest) {
    const res = await this.authService.login(req.user);
    return res;
  }

  @Post('register')
  @Public()
  async registerUser(@Body() createUserDto: CreateUserDto) {
    return await this.authService.registerUser(createUserDto);
  }

  @Get('refresh-token')
  @UseGuards(JwtRefreshAuthGuard)
  @Public()
  refreshToken(@Request() req: AuthenticatedRequest) {
    console.log('Refreshing token for user:', req.user);
    return this.authService.login(req.user);
  }

  @Get('logout')
  async logout(@Request() req: AuthenticatedRequest) {
    return await this.authService.logout(req.user.id);
  }
}
