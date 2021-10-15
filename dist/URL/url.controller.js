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
exports.UrlController = void 0;
const common_1 = require("@nestjs/common");
const url_service_1 = require("./url.service");
const Add_URL_dto_1 = require("./DTO/Add-URL.dto");
const jwt_auth_guard_1 = require("../Guards/jwt-auth.guard");
const shortid_1 = require("shortid");
const update_url_dto_1 = require("./DTO/update-url.dto");
let UrlController = class UrlController {
    constructor(boutiqueService) {
        this.boutiqueService = boutiqueService;
    }
    async getAllcvs() {
        return await this.boutiqueService.getBoutique();
    }
    async addCv(addCvDto, request) {
        addCvDto.short = (0, shortid_1.generate)();
        addCvDto.clicks = 0;
        const user = request.user;
        return this.boutiqueService.addBoutique(addCvDto, user);
    }
    async updateUrl(updateUserDto, id) {
        return await this.boutiqueService.updateUrl(id, updateUserDto);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UrlController.prototype, "getAllcvs", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Add_URL_dto_1.AddURLDto, Object]),
    __metadata("design:returntype", Promise)
], UrlController.prototype, "addCv", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_url_dto_1.UpdateUrlDto, Number]),
    __metadata("design:returntype", Promise)
], UrlController.prototype, "updateUrl", null);
UrlController = __decorate([
    (0, common_1.Controller)('url'),
    __metadata("design:paramtypes", [url_service_1.UrlService])
], UrlController);
exports.UrlController = UrlController;
//# sourceMappingURL=url.controller.js.map