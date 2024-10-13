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
exports.RealmFeedResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const web3_js_1 = require("@solana/web3.js");
const CurrentEnvironment_1 = require("../lib/decorators/CurrentEnvironment");
const CurrentUser_1 = require("../lib/decorators/CurrentUser");
const EitherResolver_1 = require("../lib/decorators/EitherResolver");
const Connection_1 = require("../lib/gqlTypes/Connection");
const PublicKey_1 = require("../lib/scalars/PublicKey");
const pagination_1 = require("../realm-feed-item/dto/pagination");
const realm_feed_item_gql_service_1 = require("../realm-feed-item/realm-feed-item.gql.service");
const realm_feed_service_1 = require("./realm-feed.service");
let RealmFeedResolver = class RealmFeedResolver {
    constructor(realmFeedService, realmFeedItemGQLService) {
        this.realmFeedService = realmFeedService;
        this.realmFeedItemGQLService = realmFeedItemGQLService;
    }
    feed(args, realm, sort = pagination_1.RealmFeedItemSort.Relevance, environment, user) {
        return this.realmFeedItemGQLService.getGQLFeedItemsList(realm, user, sort, environment, args.after, args.before, args.first, args.last);
    }
};
__decorate([
    (0, graphql_1.Query)(() => pagination_1.RealmFeedItemConnection, {
        description: 'A feed for a Realm',
    }),
    (0, EitherResolver_1.EitherResolver)(),
    __param(0, (0, graphql_1.Args)()),
    __param(1, (0, graphql_1.Args)('realm', {
        description: 'Public key of the Realm',
        type: () => PublicKey_1.PublicKeyScalar,
    })),
    __param(2, (0, graphql_1.Args)('sort', {
        type: () => pagination_1.RealmFeedItemSort,
        description: 'Sort order for the feed',
        defaultValue: pagination_1.RealmFeedItemSort.Relevance,
        nullable: true,
    })),
    __param(3, (0, CurrentEnvironment_1.CurrentEnvironment)()),
    __param(4, (0, CurrentUser_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Connection_1.ConnectionArgs,
        web3_js_1.PublicKey, String, String, Object]),
    __metadata("design:returntype", void 0)
], RealmFeedResolver.prototype, "feed", null);
RealmFeedResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [realm_feed_service_1.RealmFeedService,
        realm_feed_item_gql_service_1.RealmFeedItemGQLService])
], RealmFeedResolver);
exports.RealmFeedResolver = RealmFeedResolver;
//# sourceMappingURL=realm-feed.resolver.js.map