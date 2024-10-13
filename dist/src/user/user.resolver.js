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
exports.UserResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const CurrentEnvironment_1 = require("../lib/decorators/CurrentEnvironment");
const CurrentUser_1 = require("../lib/decorators/CurrentUser");
const errors = require("../lib/errors/gql");
const config_service_1 = require("../config/config.service");
const EitherResolver_1 = require("../lib/decorators/EitherResolver");
const RealmMemberCivicInfo_1 = require("../realm-member/dto/RealmMemberCivicInfo");
const RealmMemberTwitterInfo_1 = require("../realm-member/dto/RealmMemberTwitterInfo");
const realm_member_service_1 = require("../realm-member/realm-member.service");
const Realm_1 = require("../realm/dto/Realm");
const realm_service_1 = require("../realm/realm.service");
const User_1 = require("./dto/User");
const user_service_1 = require("./user.service");
let UserResolver = class UserResolver {
    constructor(configService, realmMemberService, realmService, userService) {
        this.configService = configService;
        this.realmMemberService = realmMemberService;
        this.realmService = realmService;
        this.userService = userService;
    }
    amSiteAdmin(member) {
        if (this.configService.get('constants.admins').some((adminPk) => adminPk.equals(member.publicKey))) {
            return true;
        }
        return null;
    }
    civicInfo(member, environment) {
        return this.realmMemberService.getCivicHandleForPublicKey(member.publicKey, environment);
    }
    followedRealms(user, currentUser, environment) {
        if (!currentUser) {
            throw new errors.Unauthorized();
        }
        if (!user.publicKey.equals(currentUser.publicKey)) {
            throw new errors.Unauthorized();
        }
        return this.realmService.listFollowedRealms(currentUser, environment);
    }
    twitterInfo(user, environment) {
        return this.realmMemberService.getTwitterHandleForPublicKey(user.publicKey, environment);
    }
    me(user) {
        return user;
    }
};
__decorate([
    (0, graphql_1.ResolveField)(() => Boolean, {
        description: 'Is the user a site admin',
        nullable: true,
    }),
    __param(0, (0, graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User_1.User]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "amSiteAdmin", null);
__decorate([
    (0, graphql_1.ResolveField)(() => RealmMemberCivicInfo_1.RealmMemberCivicInfo, {
        description: "User's civic handle info",
        nullable: true,
    }),
    (0, EitherResolver_1.EitherResolver)(),
    __param(0, (0, graphql_1.Root)()),
    __param(1, (0, CurrentEnvironment_1.CurrentEnvironment)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User_1.User, String]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "civicInfo", null);
__decorate([
    (0, graphql_1.ResolveField)(() => [Realm_1.Realm], {
        description: 'A list of realms the user follows',
    }),
    __param(0, (0, graphql_1.Root)()),
    __param(1, (0, CurrentUser_1.CurrentUser)()),
    __param(2, (0, CurrentEnvironment_1.CurrentEnvironment)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User_1.User, Object, String]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "followedRealms", null);
__decorate([
    (0, graphql_1.ResolveField)(() => RealmMemberTwitterInfo_1.RealmMemberTwitterInfo, {
        description: "User's twitter handle",
        nullable: true,
    }),
    (0, EitherResolver_1.EitherResolver)(),
    __param(0, (0, graphql_1.Root)()),
    __param(1, (0, CurrentEnvironment_1.CurrentEnvironment)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User_1.User, String]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "twitterInfo", null);
__decorate([
    (0, graphql_1.Query)(() => User_1.User, {
        description: 'User making the request, as determined by the jwt bearer token in the authorization header',
        nullable: true,
    }),
    __param(0, (0, CurrentUser_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "me", null);
UserResolver = __decorate([
    (0, graphql_1.Resolver)(() => User_1.User),
    __metadata("design:paramtypes", [config_service_1.ConfigService,
        realm_member_service_1.RealmMemberService,
        realm_service_1.RealmService,
        user_service_1.UserService])
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=user.resolver.js.map