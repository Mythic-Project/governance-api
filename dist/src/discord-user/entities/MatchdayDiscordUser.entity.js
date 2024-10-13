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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchdayDiscordUser = exports.ENCRYPTION_CONFIG = void 0;
const typeorm_1 = require("typeorm");
const typeorm_encrypted_1 = require("typeorm-encrypted");
exports.ENCRYPTION_CONFIG = {
    key: process.env.MATCHDAY_REFRESH_TOKEN_SECRET,
    algorithm: 'aes-256-gcm',
    ivLength: 16,
};
let MatchdayDiscordUser = class MatchdayDiscordUser {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], MatchdayDiscordUser.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MatchdayDiscordUser.prototype, "authId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MatchdayDiscordUser.prototype, "publicKeyStr", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        nullable: false,
        transformer: new typeorm_encrypted_1.EncryptionTransformer(exports.ENCRYPTION_CONFIG),
    }),
    __metadata("design:type", String)
], MatchdayDiscordUser.prototype, "refreshToken", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], MatchdayDiscordUser.prototype, "created", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], MatchdayDiscordUser.prototype, "deleted", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], MatchdayDiscordUser.prototype, "updated", void 0);
MatchdayDiscordUser = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Unique)(['authId'])
], MatchdayDiscordUser);
exports.MatchdayDiscordUser = MatchdayDiscordUser;
//# sourceMappingURL=MatchdayDiscordUser.entity.js.map