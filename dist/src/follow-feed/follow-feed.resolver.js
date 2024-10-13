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
exports.FollowFeedResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const CurrentEnvironment_1 = require("../lib/decorators/CurrentEnvironment");
const CurrentUser_1 = require("../lib/decorators/CurrentUser");
const errors = require("../lib/errors/gql");
const Connection_1 = require("../lib/gqlTypes/Connection");
const pagination_1 = require("../realm-feed-item/dto/pagination");
const follow_feed_service_1 = require("./follow-feed.service");
let FollowFeedResolver = class FollowFeedResolver {
    constructor(followFeedService) {
        this.followFeedService = followFeedService;
    }
    followedRealmsFeed(args, sort = pagination_1.RealmFeedItemSort.Relevance, environment, user) {
        if (!user) {
            throw new errors.Unauthorized();
        }
        return this.followFeedService.getGQLFeedItemsList(user, sort, environment, args.after, args.before, args.first, args.last);
    }
};
__decorate([
    (0, graphql_1.Query)(() => pagination_1.RealmFeedItemConnection, {
        description: 'A feed for the realms the user has followed',
    }),
    __param(0, (0, graphql_1.Args)()),
    __param(1, (0, graphql_1.Args)('sort', {
        type: () => pagination_1.RealmFeedItemSort,
        description: 'Sort order for the feed',
        defaultValue: pagination_1.RealmFeedItemSort.Relevance,
        nullable: true,
    })),
    __param(2, (0, CurrentEnvironment_1.CurrentEnvironment)()),
    __param(3, (0, CurrentUser_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Connection_1.ConnectionArgs, String, String, Object]),
    __metadata("design:returntype", void 0)
], FollowFeedResolver.prototype, "followedRealmsFeed", null);
FollowFeedResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [follow_feed_service_1.FollowFeedService])
], FollowFeedResolver);
exports.FollowFeedResolver = FollowFeedResolver;
//# sourceMappingURL=follow-feed.resolver.js.map