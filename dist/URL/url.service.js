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
exports.UrlService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const URL_entity_1 = require("./entities/URL.entity");
let UrlService = class UrlService {
    constructor(boutiqueRepository) {
        this.boutiqueRepository = boutiqueRepository;
    }
    async getBoutique() {
        return await this.boutiqueRepository.find();
    }
    async addBoutique(boutique, user) {
        const newBoutique = this.boutiqueRepository.create(boutique);
        newBoutique.user = user;
        newBoutique.clicks = 0;
        return await this.boutiqueRepository.save(newBoutique);
    }
    async updateUrl(id, user) {
        const newUser = await this.boutiqueRepository.preload(Object.assign({ id }, user));
        if (!newUser) {
            throw new common_1.NotFoundException(`le cv d'id ${id} n'existe pas`);
        }
        newUser.clicks = newUser.clicks + 1;
        return await this.boutiqueRepository.save(newUser);
    }
};
UrlService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(URL_entity_1.URLEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UrlService);
exports.UrlService = UrlService;
//# sourceMappingURL=url.service.js.map