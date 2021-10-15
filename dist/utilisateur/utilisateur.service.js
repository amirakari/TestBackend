"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtilisateurService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const typeorm_2 = require("@nestjs/typeorm");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();
let UtilisateurService = class UtilisateurService {
    constructor(configService, userRepository, jwtservice) {
        this.configService = configService;
        this.userRepository = userRepository;
        this.jwtservice = jwtservice;
    }
    async addCv(userData, mail, nom) {
        const user = this.userRepository.create(Object.assign({}, userData));
        user.salt = await bcrypt.genSalt();
        try {
            await this.userRepository.save(user);
        }
        catch (e) {
            throw new common_1.ConflictException(`le username et le password doivent etre unique`);
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
    async login(credentials) {
        const { mail, password } = credentials;
        const user = await this.userRepository
            .createQueryBuilder('user')
            .where('user.mail = :mail', { mail })
            .getOne();
        if (!user)
            throw new common_1.NotFoundException('username ou password éronnée');
        if (password === user.password) {
            const payload = {
                mail: user.mail,
            };
            const jwt = await this.jwtservice.sign(payload);
            return {
                access_token: jwt,
            };
        }
        else {
            throw new common_1.NotFoundException('username ou password éronné');
        }
    }
};
UtilisateurService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_2.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [config_1.ConfigService,
        typeorm_1.Repository,
        jwt_1.JwtService])
], UtilisateurService);
exports.UtilisateurService = UtilisateurService;
//# sourceMappingURL=utilisateur.service.js.map