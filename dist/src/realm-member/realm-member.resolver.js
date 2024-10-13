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
exports.RealmMemberResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const web3_js_1 = require("@solana/web3.js");
const Connection_1 = require("../lib/gqlTypes/Connection");
const PublicKey_1 = require("../lib/scalars/PublicKey");
const CurrentEnvironment_1 = require("../lib/decorators/CurrentEnvironment");
const EitherResolver_1 = require("../lib/decorators/EitherResolver");
const pagination_1 = require("./dto/pagination");
const RealmMember_1 = require("./dto/RealmMember");
const RealmMemberCivicInfo_1 = require("./dto/RealmMemberCivicInfo");
const RealmMemberTwitterInfo_1 = require("./dto/RealmMemberTwitterInfo");
const realm_member_service_1 = require("./realm-member.service");
let RealmMemberResolver = class RealmMemberResolver {
    constructor(realmMemberService) {
        this.realmMemberService = realmMemberService;
    }
    civicInfo(member, environment) {
        return this.realmMemberService.getCivicHandleForPublicKey(member.publicKey, environment);
    }
    twitterInfo(member, environment) {
        return this.realmMemberService.getTwitterHandleForPublicKey(member.publicKey, environment);
    }
    members(args, realm, sort = pagination_1.RealmMemberSort.Alphabetical, environment) {
        return this.realmMemberService.getGQLMemberList(realm, sort, environment, args.after, args.before, args.first, args.last);
    }
};
__decorate([
    (0, graphql_1.ResolveField)(() => RealmMemberCivicInfo_1.RealmMemberCivicInfo, {
        description: "User's civic handle info",
        nullable: true,
    }),
    (0, EitherResolver_1.EitherResolver)(),
    __param(0, (0, graphql_1.Root)()),
    __param(1, (0, CurrentEnvironment_1.CurrentEnvironment)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RealmMember_1.RealmMember, String]),
    __metadata("design:returntype", void 0)
], RealmMemberResolver.prototype, "civicInfo", null);
__decorate([
    (0, graphql_1.ResolveField)(() => RealmMemberTwitterInfo_1.RealmMemberTwitterInfo, {
        description: "User's twitter handle info",
        nullable: true,
    }),
    (0, EitherResolver_1.EitherResolver)(),
    __param(0, (0, graphql_1.Root)()),
    __param(1, (0, CurrentEnvironment_1.CurrentEnvironment)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RealmMember_1.RealmMember, String]),
    __metadata("design:returntype", void 0)
], RealmMemberResolver.prototype, "twitterInfo", null);
__decorate([
    (0, graphql_1.Query)(() => pagination_1.RealmMemberConnection, {
        description: 'List of members in a Realm',
    }),
    (0, EitherResolver_1.EitherResolver)(),
    __param(0, (0, graphql_1.Args)()),
    __param(1, (0, graphql_1.Args)('realm', {
        type: () => PublicKey_1.PublicKeyScalar,
        description: 'Public key of the Realm',
    })),
    __param(2, (0, graphql_1.Args)('sort', {
        type: () => pagination_1.RealmMemberSort,
        description: 'Sort order for the list',
        defaultValue: pagination_1.RealmMemberSort.Alphabetical,
        nullable: true,
    })),
    __param(3, (0, CurrentEnvironment_1.CurrentEnvironment)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Connection_1.ConnectionArgs,
        web3_js_1.PublicKey, String, String]),
    __metadata("design:returntype", void 0)
], RealmMemberResolver.prototype, "members", null);
RealmMemberResolver = __decorate([
    (0, graphql_1.Resolver)(() => RealmMember_1.RealmMember),
    __metadata("design:paramtypes", [realm_member_service_1.RealmMemberService])
], RealmMemberResolver);
exports.RealmMemberResolver = RealmMemberResolver;
//# sourceMappingURL=realm-member.resolver.js.map