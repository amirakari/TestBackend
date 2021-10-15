import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { URLEntity } from './entities/URL.entity';
import { AddURLDto } from './DTO/Add-URL.dto';
import { UpdateUrlDto } from "./DTO/update-url.dto";
@Injectable()
export class UrlService {
  constructor(
    @InjectRepository(URLEntity)
    private boutiqueRepository: Repository<URLEntity>,
  ) {}
  async getBoutique(): Promise<URLEntity[]> {
    return await this.boutiqueRepository.find();
  }
  async addBoutique(boutique: AddURLDto, user): Promise<URLEntity> {
    const newBoutique = this.boutiqueRepository.create(boutique);
    newBoutique.user = user;
    newBoutique.clicks = 0;
    return await this.boutiqueRepository.save(newBoutique);
  }
  async updateUrl(id: number, user: UpdateUrlDto): Promise<URLEntity> {
    const newUser = await this.boutiqueRepository.preload({
      id,
      ...user,
    });
    if (!newUser) {
      throw new NotFoundException(`le cv d'id ${id} n'existe pas`);
    }
    newUser.clicks = newUser.clicks + 1;
    return await this.boutiqueRepository.save(newUser);
  }
}
