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
exports.RealmFeedItem = void 0;
const typeorm_1 = require("typeorm");
let RealmFeedItem = class RealmFeedItem {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], RealmFeedItem.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb'),
    __metadata("design:type", Object)
], RealmFeedItem.prototype, "data", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar'),
    __metadata("design:type", String)
], RealmFeedItem.prototype, "environment", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb'),
    __metadata("design:type", Object)
], RealmFeedItem.prototype, "metadata", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RealmFeedItem.prototype, "realmPublicKeyStr", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { array: true, nullable: true }),
    __metadata("design:type", Object)
], RealmFeedItem.prototype, "crosspostedRealms", void 0);
__decorate([
    (0, typeorm_1.OneToMany)('RealmFeedItemComment', 'feedItem'),
    __metadata("design:type", Array)
], RealmFeedItem.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], RealmFeedItem.prototype, "created", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], RealmFeedItem.prototype, "deleted", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamptz'),
    __metadata("design:type", Date)
], RealmFeedItem.prototype, "updated", void 0);
RealmFeedItem = __decorate([
    (0, typeorm_1.Entity)()
], RealmFeedItem);
exports.RealmFeedItem = RealmFeedItem;
//# sourceMappingURL=RealmFeedItem.entity.js.map