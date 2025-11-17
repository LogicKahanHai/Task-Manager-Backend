import { Exclude, Expose, Type } from 'class-transformer';
import { AuthResponseDto } from 'src/auth/dtos/response.dto';
import { TaskResponseDto } from 'src/task/dto/response.dto';
import { Task } from 'src/task/entities/task.entity';

@Exclude()
export class UserResponseDto extends AuthResponseDto {
  @Exclude()
  declare refresh_token: string;
  @Expose()
  @Type(() => TaskResponseDto)
  tasks: Task[];
}
