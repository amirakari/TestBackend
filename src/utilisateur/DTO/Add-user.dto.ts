import { Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class AddUserDto {
  @IsNotEmpty()
  @IsString()
  nom: string;
  @IsNotEmpty()
  @IsString()
  prenom: string;
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  numtel: number;
  @IsNotEmpty()
  @IsString()
  adresse: string;
  @IsNotEmpty()
  @IsString()
  type: string;
  @IsNotEmpty()
  @IsEmail()
  mail: string;
  @IsNotEmpty()
  password: string;
}
