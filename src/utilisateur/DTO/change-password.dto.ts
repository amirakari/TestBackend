import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  password: string;
}
