import { IsNotEmpty } from 'class-validator';

export class LoginCredentialsDto {
  @IsNotEmpty()
  mail: string;
  @IsNotEmpty()
  password: string;
}
