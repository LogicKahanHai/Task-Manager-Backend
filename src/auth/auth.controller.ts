import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  UseInterceptors,
} from '@nestjs/common';
import { LocalAuthGuard } from './guards/local.guard';
import type { AuthenticatedRequest } from 'src/utils/types/authenticated.request.type';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { ResponseInterceptor } from 'src/utils/interceptors/response.interceptor';
import { AuthResponseDto } from './dtos/response.dto';

@Controller('auth')
@Public()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @UseInterceptors(new ResponseInterceptor(AuthResponseDto))
  login(@Request() req: AuthenticatedRequest) {
    return this.authService.login(req.user);
  }

  @Post('register')
  @UseInterceptors(new ResponseInterceptor(AuthResponseDto))
  async registerUser(@Body() createUserDto: CreateUserDto) {
    return await this.authService.registerUser(createUserDto);
  }
}
