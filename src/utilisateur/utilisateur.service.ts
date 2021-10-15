import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { getConnection, Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { LoginCredentialsDto } from './DTO/login-credentials.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AddUserDto } from './DTO/Add-user.dto';
import { UpdateUserDto } from './DTO/update-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PayloadInterface } from './interfaces/payload.interface';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt } from 'passport-jwt';
import { from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ForgotPasswordDto } from './DTO/forgot-password.dto';
import { MailService } from '../mail/mail.service';
import * as nodemailer from 'nodemailer';
import { ChangePasswordDto } from './DTO/change-password.dto';
import * as dotenv from 'dotenv';
dotenv.config();
@Injectable()
export class UtilisateurService {
  private readonly clientAppUrl: string;
  constructor(
    private configService: ConfigService,
    private mailService: MailService,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtservice: JwtService,
  ) {}
  async getUsers(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }
  async addCv(userData: AddUserDto): Promise<UserEntity> {
    const user = this.userRepository.create({
      ...userData,
    });
    //user.salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, user.salt);
    try {
      await this.userRepository.save(user);
    } catch (e) {
      throw new ConflictException(
        `le username et le password doivent etre unique`,
      );
    }
    return user;
  }
  async findById(id: number) {
    const utilisateur = await this.userRepository.findOne(id);
    if (!utilisateur) {
      throw new NotFoundException(`l'utilisateur d'id ${id} n'existe pas`);
    }
    return utilisateur;
  }
  async updateCv(id: number, user: UpdateUserDto): Promise<UserEntity> {
    const newUser = await this.userRepository.preload({
      id,
      ...user,
    });
    if (!newUser) {
      throw new NotFoundException(`le cv d'id ${id} n'existe pas`);
    }
    newUser.salt = await bcrypt.genSalt();
    newUser.password = await bcrypt.hash(newUser.password, newUser.salt);
    return await this.userRepository.save(newUser);
  }
  async softDeleteUser(id: number) {
    const cv = await this.userRepository.findOne(id);
    if (!cv) {
      throw new NotFoundException(`le cv d'id ${id} n'existe pas`);
    }
    return await this.userRepository.softRemove(cv);
  }
  async restoreUtilisateur(id: number) {
    this.userRepository.restore(id);
  }
  async login(credentials: LoginCredentialsDto) {
    const { mail, password } = credentials;
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.mail = :mail', { mail })
      .getOne();
    if (!user) throw new NotFoundException('username ou password éronnée');
    const hashedPassword = await bcrypt.hash(password, user.salt);
    if (hashedPassword === user.password) {
      const payload = {
        mail: user.mail,
        type: user.type,
      };
      const jwt = await this.jwtservice.sign(payload);
      return {
        access_token: jwt,
      };
    } else {
      throw new NotFoundException('username ou password éronné');
    }
  }
  async ChangePassword(
    id: number,
    forgotPassword: ChangePasswordDto,
  ): Promise<UserEntity> {
    const hashedPassword = await bcrypt.hash(forgotPassword);
    const newUser = await this.userRepository.preload({
      id,
      ...hashedPassword,
    });
    if (!newUser) {
      throw new NotFoundException(`le cv d'id ${id} n'existe pas`);
    }
    return await this.userRepository.save(newUser);
  }
  async forgotPassword(forgotPassword: ForgotPasswordDto): Promise<void> {
    const { mail } = forgotPassword;
    const utilisateur = await this.userRepository
      .createQueryBuilder('user')
      .where('user.mail = :mail', { mail })
      .getOne();
    const confirmLink = process.env.Mail + `/resetPassword/${utilisateur.id}`;
    nodemailer.createTestAccount((err, account) => {
      if (err) {
        console.log(err);
      }
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: 'amir.akari@esprit.tn',
          pass: '183JMT1875',
        },
      });
      const message = {
        from: 'Zéro Gaspii <amir.akari@esprit.tn>',
        to: utilisateur.mail,
        subject: 'Réinitialiser votre mot de passe',
        html: `
        <html>
        <body>
        <h3>Bonjour ${utilisateur.nom}</h3>
        <p>s'il vous plaît utilisez  <a href="${confirmLink}">ce lien</a> pour réinitialiser votre mot de passe</p>
        </body>
        </html>`,
      };

      transporter.sendMail(message, (err, info) => {
        if (err) {
          console.log('Error occurred. ' + err.message);
        }
      });
    });
  }
  async envoiemail() {
    const type = 'user';
    const qb = await getConnection()
      .createQueryBuilder()
      .select('user.mail', 'mail')
      .from(UserEntity, 'user')
      .where('user.type = :type', { type })
      .getRawMany();
    for (let i = 0; i < qb.length; i++) {
      console.log(qb[i].mail);
      nodemailer.createTestAccount((err, account) => {
        if (err) {
          console.log(err);
        }
        const transporter = nodemailer.createTransport({
          host: 'smtp.sendgrid.net',
          port: 465,
          secure: true,
          auth: {
            user: 'apikey',
            pass: process.env.SENDGRID_API_KEY,
          },
        });
        const message = {
          from: 'Zéro Gaspii <amir.akari@esprit.tn>',
          to: qb[i].mail,
          subject: 'Réinitialiser votre mot de passe',
          html: `
        <html>
        <body>
        <h3>le magasin aziza</h3>
        <p>s'il vous plaît utilisez  pour réinitialiser votre mot de passe</p>
        </body>
        </html>`,
        };

        transporter.sendMail(message, (err, info) => {
          if (err) {
            console.log('Error occurred. ' + err.message);
          }
        });
      });
    }
    /**/
  }
}
