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
exports.RefreshToken = exports.DiscordUser = void 0;
const graphql_1 = require("@nestjs/graphql");
const web3_js_1 = require("@solana/web3.js");
const PublicKey_1 = require("../../lib/scalars/PublicKey");
let DiscordUser = class DiscordUser {
};
__decorate([
    (0, graphql_1.Field)(() => PublicKey_1.PublicKeyScalar, { description: 'Public key' }),
    __metadata("design:type", web3_js_1.PublicKey)
], DiscordUser.prototype, "publicKey", void 0);
DiscordUser = __decorate([
    (0, graphql_1.ObjectType)({
        description: 'A Discord user',
    })
], DiscordUser);
exports.DiscordUser = DiscordUser;
let RefreshToken = class RefreshToken {
};
__decorate([
    (0, graphql_1.Field)({ description: 'Discord user refresh token' }),
    __metadata("design:type", String)
], RefreshToken.prototype, "token", void 0);
RefreshToken = __decorate([
    (0, graphql_1.ObjectType)({
        description: "A Discord user's refresh token",
    })
], RefreshToken);
exports.RefreshToken = RefreshToken;
//# sourceMappingURL=DiscordUser.js.map