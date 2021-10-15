import { Module } from '@nestjs/common';
import { BoutiqueController } from './boutique.controller';
import { BoutiqueService } from './boutique.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoutiqueEntity } from './entities/URL.entity';
import { UtilisateurModule } from '../utilisateur/utilisateur.module';
@Module({
  imports: [TypeOrmModule.forFeature([BoutiqueEntity]), UtilisateurModule],
  controllers: [BoutiqueController],
  providers: [BoutiqueService],
})
export class BoutiqueModule {}
