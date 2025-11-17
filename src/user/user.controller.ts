import {
  Controller,
  Get,
  Body,
  Patch,
  Delete,
  Req,
  UseInterceptors,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import type { AuthenticatedRequest } from 'src/utils/types/authenticated.request.type';
import { ResponseInterceptor } from 'src/utils/interceptors/response.interceptor';
import { UserResponseDto } from './dto/response.dto';

@Controller('user')
@UseInterceptors(new ResponseInterceptor(UserResponseDto))
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.userService.create(createUserDto);
  // }

  // @Get()
  // findAll() {
  //   return this.userService.findAll();
  // }

  @Get()
  findOne(@Req() req: AuthenticatedRequest) {
    return req.user;
  }

  @Patch()
  update(
    @Req() req: AuthenticatedRequest,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(req.user.id, updateUserDto);
  }

  @Delete()
  remove(@Req() req: AuthenticatedRequest) {
    return this.userService.removeUser(req.user.id);
  }
}
