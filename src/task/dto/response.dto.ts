import { Exclude, Expose, Type } from 'class-transformer';
import { UserResponseDto } from 'src/user/dto/response.dto';
import { User } from 'src/user/entities/user.entity';

@Exclude()
export class TaskResponseDto {
  @Expose()
  id: string;
  @Expose()
  title: string;
  @Expose()
  description: string;
  @Expose()
  isCompleted: string;
  @Exclude()
  @Type(() => UserResponseDto)
  user: User;
}
