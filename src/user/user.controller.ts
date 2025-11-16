import { Controller, Get, Body, Patch, Delete, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import type { AuthenticatedRequest } from 'src/utils/types/authenticated.request.type';

@Controller('user')
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
    return this.userService.findOne(req.user.id);
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
