import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddURLDto {
  @IsNotEmpty()
  @IsString()
  full: string;
  @IsNotEmpty()
  @IsString()
  short: string;
  @IsNotEmpty()
  @IsNumber()
  clicks: number;
}
