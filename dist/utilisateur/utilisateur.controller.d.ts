import { UserEntity } from './entities/user.entity';
import { UtilisateurService } from './utilisateur.service';
import { AddUserDto } from './DTO/Add-user.dto';
import { LoginCredentialsDto } from './DTO/login-credentials.dto';
export declare class UtilisateurController {
    private userService;
    constructor(userService: UtilisateurService);
    addCv(addCvDto: AddUserDto): Promise<UserEntity>;
    Login(credentials: LoginCredentialsDto): Promise<{
        access_token: string;
    }>;
}
