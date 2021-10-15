import { Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  nom: string;
  @IsOptional()
  @IsString()
  prenom: string;
  @IsOptional()
  @IsString()
  photodeprofil: string;
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  numtel: number;
  @IsOptional()
  @IsString()
  adresse: string;
  @IsOptional()
  @IsString()
  type: string;
  @IsOptional()
  @IsString()
  mail: string;
  @IsOptional()
  @IsString()
  password: string;
}
