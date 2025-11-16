import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class AuthResponseDto {
  @Expose()
  id: string;
  @Expose()
  email: string;
  @Expose()
  access_token: string;
  @Expose()
  refresh_token: string;
  @Expose()
  logout: boolean;
}
