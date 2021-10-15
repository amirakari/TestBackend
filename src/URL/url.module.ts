import { Module } from '@nestjs/common';
import { UrlController } from './url.controller';
import { UrlService } from './url.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { URLEntity } from './entities/URL.entity';
import { UtilisateurModule } from '../utilisateur/utilisateur.module';
@Module({
  imports: [TypeOrmModule.forFeature([URLEntity]), UtilisateurModule],
  controllers: [UrlController],
  providers: [UrlService],
})
export class UrlModule {}
