import { Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateUrlDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  clicks: number;
}
