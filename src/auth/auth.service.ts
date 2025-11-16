import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { HashingService } from 'src/utils/services/hashing.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly hashingService: HashingService,
    private readonly userService: UserService,
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

  async registerUser(createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.create(createUserDto);
  }
}
