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
import { UrlService } from './url.service';
import { Request } from 'express';
import { URLEntity } from './entities/URL.entity';
import { AddURLDto } from './DTO/Add-URL.dto';
import { JwtAuthGuard } from '../Guards/jwt-auth.guard';
import { generate } from 'shortid';
import { UpdateUrlDto } from './DTO/update-url.dto';
@Controller('url')
export class UrlController {
  constructor(private boutiqueService: UrlService) {}
  @Get()
  async getAllcvs(): Promise<URLEntity[]> {
    return await this.boutiqueService.getBoutique();
  }
  @Post()
  @UseGuards(JwtAuthGuard)
  async addCv(
    @Body() addCvDto: AddURLDto,
    @Req() request: Request,
  ): Promise<URLEntity> {
    addCvDto.short = generate();
    addCvDto.clicks = 0;
    const user = request.user;
    return this.boutiqueService.addBoutique(addCvDto, user);
  }
  @Patch(':id')
  async updateUrl(
    @Body() updateUserDto: UpdateUrlDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<any> {
    return await this.boutiqueService.updateUrl(id, updateUserDto);
  }
}
