import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddURLDto {
  @IsNotEmpty()
  @IsString()
  full: string;
  short: string;
  clicks: number;
}
