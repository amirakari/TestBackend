import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { UtilisateurService } from './utilisateur.service';
import { AddUserDto } from './DTO/Add-user.dto';
import { LoginCredentialsDto } from './DTO/login-credentials.dto';
import { ForgotPasswordDto } from './DTO/forgot-password.dto';
@Controller('utilisateur')
export class UtilisateurController {
  constructor(private userService: UtilisateurService) {}
  @Post()
  async addCv(@Body() addCvDto: AddUserDto): Promise<UserEntity> {
    return this.userService.addCv(addCvDto, addCvDto.mail, addCvDto.nom);
  }
  @Post('login')
  async Login(@Body() credentials: LoginCredentialsDto) {
    return this.userService.login(credentials);
  }
}
