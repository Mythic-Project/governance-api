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
exports.RealmMemberCivicInfo = void 0;
const graphql_1 = require("@nestjs/graphql");
let RealmMemberCivicInfo = class RealmMemberCivicInfo {
};
__decorate([
    (0, graphql_1.Field)(() => String, {
        description: 'URL for the associated Civic avatar',
        nullable: true,
    }),
    __metadata("design:type", String)
], RealmMemberCivicInfo.prototype, "avatarUrl", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, {
        description: "User's civic handle",
    }),
    __metadata("design:type", String)
], RealmMemberCivicInfo.prototype, "handle", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean, {
        description: 'Whether the user been verified by civic',
    }),
    __metadata("design:type", Boolean)
], RealmMemberCivicInfo.prototype, "isVerified", void 0);
RealmMemberCivicInfo = __decorate([
    (0, graphql_1.ObjectType)({
        description: 'Connected Civic info',
    })
], RealmMemberCivicInfo);
exports.RealmMemberCivicInfo = RealmMemberCivicInfo;
//# sourceMappingURL=RealmMemberCivicInfo.js.map