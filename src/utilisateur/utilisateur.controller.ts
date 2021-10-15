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
import { UpdateUserDto } from './DTO/update-user.dto';
import { LoginCredentialsDto } from './DTO/login-credentials.dto';
import { JwtAuthGuard } from '../Guards/jwt-auth.guard';

import { JwtStrategy } from './strategy/passport-jwt.strategy';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Observable, of, pipe } from 'rxjs';
import { join } from 'path';
import * as path from 'path';
import { builders } from 'prettier/doc';
import { doc } from 'prettier';
import { v4 as uuidv4 } from 'uuid';
import { ForgotPasswordDto } from './DTO/forgot-password.dto';
import { ChangePasswordDto } from './DTO/change-password.dto';
@Controller('utilisateur')
export class UtilisateurController {
  constructor(
    private userService: UtilisateurService,
    private userconnecte: JwtStrategy,
  ) {}
  @Get()
  async getAllcvs(): Promise<UserEntity[]> {
    return await this.userService.getUsers();
  }
  @Get('userconnecte')
  @UseGuards(JwtAuthGuard)
  async getuserconnecte(@Req() request: Request) {
    const user = request.user;
    return user;
  }
  @Post()
  async addCv(@Body() addCvDto: AddUserDto): Promise<UserEntity> {
    return this.userService.addCv(addCvDto);
  }
  @Post('login')
  async Login(@Body() credentials: LoginCredentialsDto) {
    return this.userService.login(credentials);
  }
  @Post('/forgotPassword')
  async forgotPassword(
    @Body(new ValidationPipe()) forgotPassword: ForgotPasswordDto,
  ): Promise<void> {
    return this.userService.forgotPassword(forgotPassword);
  }
  @Patch('/ChangePassword/:id')
  async ChangePassword(
    @Body() updateUserDto: UpdateUserDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserEntity> {
    return await this.userService.updateCv(id, updateUserDto);
  }
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async updateCv(
    @Body() updateUserDto: UpdateUserDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<any> {
    return await this.userService.updateCv(id, updateUserDto);
  }
  @Post('upload/:id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/images',
        filename: (req, file, cb) => {
          const filename: string =
            path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
          const extension: string = path.parse(file.originalname).ext;
          cb(null, `${filename}${extension}`);
        },
      }),
    }),
  )
  uploadfile(
    @UploadedFile() file: Express.Multer.File,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<any> {
    updateUserDto.photodeprofil = file.filename;
    console.log(updateUserDto);
    return this.userService.updateCv(id, updateUserDto);
  }
  @Get('profileimage/:image')
  findProfileImage(
    @Res() res,
    @Param('image') image,
    @Req() request: Request,
  ): Observable<any> {
    const user = request.user;
    return of(res.sendFile(join(process.cwd(), 'uploads/images/' + image)));
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async removeUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.softDeleteUser(id);
  }
  @Get('/recover/:id')
  async recoverUtilisateur(@Param('id', ParseIntPipe) id: number) {
    this.userService.restoreUtilisateur(id);
  }
  @Get('envoie')
  async getusers() {
    return await this.userService.envoiemail();
  }
}
