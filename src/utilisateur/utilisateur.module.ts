import { Module } from '@nestjs/common';
import { UtilisateurController } from './utilisateur.controller';
import { UtilisateurService } from './utilisateur.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { JwtStrategy } from './strategy/passport-jwt.strategy';
import { GoogleStrategy } from '../google.strategy';
import { MailService } from '../mail/mail.service';
dotenv.config();
@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: {
        expiresIn: 10800,
      },
    }),
  ],
  controllers: [UtilisateurController],
  providers: [UtilisateurService, JwtStrategy, MailService],
})
export class UtilisateurModule {}
