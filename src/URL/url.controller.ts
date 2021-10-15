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
} from '@nestjs/common';
import { BoutiqueService } from './boutique.service';
import { BoutiqueEntity } from './entities/URL.entity';
import { AddBoutiqueDto } from './DTO/Add-boutique.dto';
import { UpdateBoutiqueDto } from './DTO/update-boutique.dto';
import { JwtAuthGuard } from '../Guards/jwt-auth.guard';
import { Request } from 'express';
import { User } from '../decorators/user.decorator';
import { Observable, of } from 'rxjs';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path, { join } from 'path';
import { UpdateUserDto } from '../utilisateur/DTO/update-user.dto';
@Controller('boutique')
export class BoutiqueController {
  constructor(private boutiqueService: BoutiqueService) {}
  @Get()
  async getAllcvs(): Promise<BoutiqueEntity[]> {
    return await this.boutiqueService.getBoutique();
  }
  @Get('user/:id')
  @UseGuards(JwtAuthGuard)
  async getboutiquebyuser(@Param('id', ParseIntPipe) id: number) {
    return await this.boutiqueService.getBoutiqueParUser(id);
  }
  @Post()
  @UseGuards(JwtAuthGuard)
  async addCv(
    @Body() addCvDto: AddBoutiqueDto,
    @Req() request: Request,
  ): Promise<BoutiqueEntity> {
    const user = request.user;
    return this.boutiqueService.addBoutique(addCvDto, user);
  }
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async updateCv(
    @Body() updateUserDto: UpdateBoutiqueDto,
    @Param('id', ParseIntPipe) id: number,
    @User() user,
  ): Promise<BoutiqueEntity> {
    return await this.boutiqueService.updateBoutique(id, updateUserDto, user);
  }
  @Post('upload/:id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/imagesboutique',
      }),
    }),
  )
  uploadfile(
    @UploadedFile() file: Express.Multer.File,
    @Req() request: Request,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateBoutiqueDto,
    @User() user,
  ): Promise<any> {
    updateUserDto.photo = file.filename;
    console.log(updateUserDto);
    return this.boutiqueService.updateBoutique(id, updateUserDto, user);
  }
  @Get('profileimage/:image')
  findProfileImage(
    @Res() res,
    @Param('image') image,
    @Req() request: Request,
  ): Observable<any> {
    const user = request.user;
    return of(
      res.sendFile(join(process.cwd(), 'uploads/imagesboutique/' + image)),
    );
  }
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async removeUser(@Param('id', ParseIntPipe) id: number, @User() user) {
    return this.boutiqueService.softDeleteBoutique(id, user);
  }
  @Get('/recover/:id')
  @UseGuards(JwtAuthGuard)
  async recoverUtilisateur(
    @Param('id', ParseIntPipe) id: number,
    @User() user,
  ) {
    this.boutiqueService.restoreUtilisateur(id, user);
  }
  @Get(':id')
  async getBoutique(@Param('id', ParseIntPipe) id): Promise<BoutiqueEntity> {
    return this.boutiqueService.findById(id);
  }
}
