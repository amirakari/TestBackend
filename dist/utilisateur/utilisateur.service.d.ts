import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { LoginCredentialsDto } from './DTO/login-credentials.dto';
import { AddUserDto } from './DTO/Add-user.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
export declare class UtilisateurService {
    private configService;
    private userRepository;
    private jwtservice;
    private readonly clientAppUrl;
    constructor(configService: ConfigService, userRepository: Repository<UserEntity>, jwtservice: JwtService);
    addCv(userData: AddUserDto, mail: any, nom: any): Promise<UserEntity>;
    login(credentials: LoginCredentialsDto): Promise<{
        access_token: string;
    }>;
}
