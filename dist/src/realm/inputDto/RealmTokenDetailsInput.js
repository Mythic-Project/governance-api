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
exports.RealmTokenDetailsInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const web3_js_1 = require("@solana/web3.js");
const PublicKey_1 = require("../../lib/scalars/PublicKey");
let RealmTokenDetailsInput = class RealmTokenDetailsInput {
};
__decorate([
    (0, graphql_1.Field)(() => PublicKey_1.PublicKeyScalar, {
        description: 'The Mint',
    }),
    __metadata("design:type", web3_js_1.PublicKey)
], RealmTokenDetailsInput.prototype, "mint", void 0);
RealmTokenDetailsInput = __decorate([
    (0, graphql_1.InputType)({
        description: 'An associated token',
    })
], RealmTokenDetailsInput);
exports.RealmTokenDetailsInput = RealmTokenDetailsInput;
//# sourceMappingURL=RealmTokenDetailsInput.js.map