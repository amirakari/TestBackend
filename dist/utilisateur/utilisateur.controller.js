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
exports.UtilisateurController = void 0;
const common_1 = require("@nestjs/common");
const utilisateur_service_1 = require("./utilisateur.service");
const Add_user_dto_1 = require("./DTO/Add-user.dto");
const login_credentials_dto_1 = require("./DTO/login-credentials.dto");
let UtilisateurController = class UtilisateurController {
    constructor(userService) {
        this.userService = userService;
    }
    async addCv(addCvDto) {
        return this.userService.addCv(addCvDto, addCvDto.mail, addCvDto.nom);
    }
    async Login(credentials) {
        return this.userService.login(credentials);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Add_user_dto_1.AddUserDto]),
    __metadata("design:returntype", Promise)
], UtilisateurController.prototype, "addCv", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_credentials_dto_1.LoginCredentialsDto]),
    __metadata("design:returntype", Promise)
], UtilisateurController.prototype, "Login", null);
UtilisateurController = __decorate([
    (0, common_1.Controller)('utilisateur'),
    __metadata("design:paramtypes", [utilisateur_service_1.UtilisateurService])
], UtilisateurController);
exports.UtilisateurController = UtilisateurController;
//# sourceMappingURL=utilisateur.controller.js.map