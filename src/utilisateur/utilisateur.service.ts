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
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ForgotPasswordDto } from './DTO/forgot-password.dto';
import * as nodemailer from 'nodemailer';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
dotenv.config();
@Injectable()
export class UtilisateurService {
  private readonly clientAppUrl: string;
  constructor(
    private configService: ConfigService,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtservice: JwtService,
  ) {}
  async addCv(userData: AddUserDto, mail, nom): Promise<UserEntity> {
    const user = this.userRepository.create({
      ...userData,
    });
    user.salt = await bcrypt.genSalt();
    try {
      await this.userRepository.save(user);
    } catch (e) {
      throw new ConflictException(
        `le username et le password doivent etre unique`,
      );
    }
    const confirmLink = 'http://localhost:4200/login';
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
      from: 'TABHOTEL DIGITAL <amir.akari@esprit.tn>',
      to: mail,
      subject: 'Valider ton compte',
      html: `
        <html>
        <body>
        <h3>Bonjour ${nom}</h3>
        <p>s'il vous plaît utilisez  <a href="${confirmLink}">ce lien</a> pour activer ton compte</p>
        </body>
        </html>`,
    };

    transporter.sendMail(message, (err, info) => {
      if (err) {
        console.log('Error occurred. ' + err.message);
      }
    });
    return user;
  }
  async login(credentials: LoginCredentialsDto) {
    const { mail, password } = credentials;
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.mail = :mail', { mail })
      .getOne();
    if (!user) throw new NotFoundException('username ou password éronnée');
    if (password === user.password) {
      const payload = {
        mail: user.mail,
      };
      const jwt = await this.jwtservice.sign(payload);
      return {
        access_token: jwt,
      };
    } else {
      throw new NotFoundException('username ou password éronné');
    }
  }
}
