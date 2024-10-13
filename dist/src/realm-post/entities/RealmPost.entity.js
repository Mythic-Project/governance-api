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
exports.RealmPost = void 0;
const typeorm_1 = require("typeorm");
const User_entity_1 = require("../../user/entities/User.entity");
let RealmPost = class RealmPost {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], RealmPost.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RealmPost.prototype, "authorId", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb'),
    __metadata("design:type", Object)
], RealmPost.prototype, "data", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar'),
    __metadata("design:type", String)
], RealmPost.prototype, "environment", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RealmPost.prototype, "realmPublicKeyStr", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)('User', 'posts'),
    __metadata("design:type", User_entity_1.User)
], RealmPost.prototype, "author", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], RealmPost.prototype, "created", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], RealmPost.prototype, "deleted", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], RealmPost.prototype, "updated", void 0);
RealmPost = __decorate([
    (0, typeorm_1.Entity)()
], RealmPost);
exports.RealmPost = RealmPost;
//# sourceMappingURL=RealmPost.entity.js.map