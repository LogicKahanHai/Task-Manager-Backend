import { Exclude } from 'class-transformer';
import { AuthResponseDto } from 'src/auth/dtos/response.dto';

@Exclude()
export class UserResponseDto extends AuthResponseDto {
  @Exclude()
  declare refresh_token: string;
}
