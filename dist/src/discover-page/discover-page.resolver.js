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
exports.DiscoverPageSpotlightItemResolver = exports.DiscoverPageResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const CurrentEnvironment_1 = require("../lib/decorators/CurrentEnvironment");
const CurrentUser_1 = require("../lib/decorators/CurrentUser");
const errors = require("../lib/errors/gql");
const config_service_1 = require("../config/config.service");
const Realm_1 = require("../realm/dto/Realm");
const realm_service_1 = require("../realm/realm.service");
const discover_page_service_1 = require("./discover-page.service");
const DiscoverPage_1 = require("./dto/DiscoverPage");
const DiscoverPageSpotlightItem_1 = require("./dto/DiscoverPageSpotlightItem");
const DiscoverPageInput_1 = require("./inputDto/DiscoverPageInput");
let DiscoverPageResolver = class DiscoverPageResolver {
    constructor(configService, discoverPageService) {
        this.configService = configService;
        this.discoverPageService = discoverPageService;
    }
    discoverPage(environment) {
        return this.discoverPageService.getCurrentDiscoverPage(environment);
    }
    updateDiscoverPage(data, environment, user) {
        if (!user) {
            throw new errors.Unauthorized();
        }
        if (!this.configService.get('constants.admins').some((adminPk) => adminPk.equals(user.publicKey))) {
            throw new errors.Unauthorized();
        }
        return this.discoverPageService.updateDiscoverPage({
            daoToolingPublicKeyStrs: data.daoTooling.map((pk) => pk.toBase58()),
            defiPublicKeyStrs: data.defi.map((pk) => pk.toBase58()),
            gamingPublicKeyStrs: data.gaming.map((pk) => pk.toBase58()),
            hackathonWinnersPublicKeyStrs: data.hackathonWinners.map((pk) => pk.toBase58()),
            keyAnnouncementFeedItemIds: data.keyAnnouncements,
            nftCollectionsPublicKeyStrs: data.nftCollections.map((pk) => pk.toBase58()),
            popularPublicKeyStrs: data.popular.map((pk) => pk.toBase58()),
            spotlight: data.spotlight.map((s) => ({
                heroImageUrl: s.heroImageUrl,
                title: s.title,
                realmPublicKeyStr: s.publicKey.toBase58(),
                description: s.description,
                stats: s.stats,
            })),
            trendingOrgPublicKeyStrs: data.trending.map((pk) => pk.toBase58()),
            web3PublicKeyStrs: data.web3.map((pk) => pk.toBase58()),
        }, environment);
    }
};
__decorate([
    (0, graphql_1.Query)(() => DiscoverPage_1.DiscoverPage, {
        description: 'The discover page',
    }),
    __param(0, (0, CurrentEnvironment_1.CurrentEnvironment)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DiscoverPageResolver.prototype, "discoverPage", null);
__decorate([
    (0, graphql_1.Mutation)(() => DiscoverPage_1.DiscoverPage, {
        description: 'Update the Discover Page',
    }),
    __param(0, (0, graphql_1.Args)('data', {
        type: () => DiscoverPageInput_1.DiscoverPageInput,
        description: 'A new discover page',
    })),
    __param(1, (0, CurrentEnvironment_1.CurrentEnvironment)()),
    __param(2, (0, CurrentUser_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DiscoverPageInput_1.DiscoverPageInput, String, Object]),
    __metadata("design:returntype", void 0)
], DiscoverPageResolver.prototype, "updateDiscoverPage", null);
DiscoverPageResolver = __decorate([
    (0, graphql_1.Resolver)(() => DiscoverPage_1.DiscoverPage),
    __metadata("design:paramtypes", [config_service_1.ConfigService,
        discover_page_service_1.DiscoverPageService])
], DiscoverPageResolver);
exports.DiscoverPageResolver = DiscoverPageResolver;
let DiscoverPageSpotlightItemResolver = class DiscoverPageSpotlightItemResolver {
    constructor(realmService) {
        this.realmService = realmService;
    }
    realm(item, environment) {
        return this.realmService.getRealm(item.publicKey, environment);
    }
};
__decorate([
    (0, graphql_1.ResolveField)(() => Realm_1.Realm, {
        description: 'Realm associated with the Spotlight item',
    }),
    __param(0, (0, graphql_1.Root)()),
    __param(1, (0, CurrentEnvironment_1.CurrentEnvironment)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DiscoverPageSpotlightItem_1.DiscoverPageSpotlightItem, String]),
    __metadata("design:returntype", void 0)
], DiscoverPageSpotlightItemResolver.prototype, "realm", null);
DiscoverPageSpotlightItemResolver = __decorate([
    (0, graphql_1.Resolver)(() => DiscoverPageSpotlightItem_1.DiscoverPageSpotlightItem),
    __metadata("design:paramtypes", [realm_service_1.RealmService])
], DiscoverPageSpotlightItemResolver);
exports.DiscoverPageSpotlightItemResolver = DiscoverPageSpotlightItemResolver;
//# sourceMappingURL=discover-page.resolver.js.map