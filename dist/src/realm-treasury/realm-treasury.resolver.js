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
exports.RealmTreasuryResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const web3_js_1 = require("@solana/web3.js");
const CurrentEnvironment_1 = require("../lib/decorators/CurrentEnvironment");
const EitherResolver_1 = require("../lib/decorators/EitherResolver");
const PublicKey_1 = require("../lib/scalars/PublicKey");
const BigNumber_1 = require("../lib/scalars/BigNumber");
const RealmTreasury_1 = require("./dto/RealmTreasury");
const realm_treasury_service_1 = require("./realm-treasury.service");
let RealmTreasuryResolver = class RealmTreasuryResolver {
    constructor(realmTreasuryService) {
        this.realmTreasuryService = realmTreasuryService;
    }
    realmTreasury(realm) {
        return { belongsTo: realm };
    }
    totalValue(realmTreasury, environment) {
        return this.realmTreasuryService.getRealmTreasuryValue(realmTreasury.belongsTo, environment);
    }
};
__decorate([
    (0, graphql_1.Query)(() => RealmTreasury_1.RealmTreasury, {
        description: "A realm's treasury",
    }),
    __param(0, (0, graphql_1.Args)('realm', {
        type: () => PublicKey_1.PublicKeyScalar,
        description: 'A realm',
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [web3_js_1.PublicKey]),
    __metadata("design:returntype", void 0)
], RealmTreasuryResolver.prototype, "realmTreasury", null);
__decorate([
    (0, graphql_1.ResolveField)(() => BigNumber_1.BigNumberScalar, {
        description: 'The total value of the treasury',
    }),
    (0, EitherResolver_1.EitherResolver)(),
    __param(0, (0, graphql_1.Root)()),
    __param(1, (0, CurrentEnvironment_1.CurrentEnvironment)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RealmTreasury_1.RealmTreasury, String]),
    __metadata("design:returntype", void 0)
], RealmTreasuryResolver.prototype, "totalValue", null);
RealmTreasuryResolver = __decorate([
    (0, graphql_1.Resolver)(() => RealmTreasury_1.RealmTreasury),
    __metadata("design:paramtypes", [realm_treasury_service_1.RealmTreasuryService])
], RealmTreasuryResolver);
exports.RealmTreasuryResolver = RealmTreasuryResolver;
//# sourceMappingURL=realm-treasury.resolver.js.map