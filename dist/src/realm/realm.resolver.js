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
exports.RealmTeamMemberResolver = exports.RealmTokenDetailsResolver = exports.RealmFaqItemResolver = exports.RealmResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const web3_js_1 = require("@solana/web3.js");
const EI = require("fp-ts/Either");
const CurrentEnvironment_1 = require("../lib/decorators/CurrentEnvironment");
const CurrentUser_1 = require("../lib/decorators/CurrentUser");
const errors = require("../lib/errors/gql");
const ClippedRichTextDocument_1 = require("../lib/gqlTypes/ClippedRichTextDocument");
const Connection_1 = require("../lib/gqlTypes/Connection");
const abbreviateAddress_1 = require("../lib/textManipulation/abbreviateAddress");
const clipRichTextDocument_1 = require("../lib/textManipulation/clipRichTextDocument");
const wait_1 = require("../lib/wait");
const EitherResolver_1 = require("../lib/decorators/EitherResolver");
const PublicKey_1 = require("../lib/scalars/PublicKey");
const pagination_1 = require("../realm-feed-item/dto/pagination");
const RealmFeedItem_1 = require("../realm-feed-item/dto/RealmFeedItem");
const realm_feed_item_gql_service_1 = require("../realm-feed-item/realm-feed-item.gql.service");
const realm_feed_item_service_1 = require("../realm-feed-item/realm-feed-item.service");
const GovernanceRules_1 = require("../realm-governance/dto/GovernanceRules");
const realm_governance_service_1 = require("../realm-governance/realm-governance.service");
const realm_hub_service_1 = require("../realm-hub/realm-hub.service");
const pagination_2 = require("../realm-member/dto/pagination");
const realm_member_service_1 = require("../realm-member/realm-member.service");
const pagination_3 = require("../realm-proposal/dto/pagination");
const realm_proposal_gql_service_1 = require("../realm-proposal/realm-proposal.gql.service");
const RealmTreasury_1 = require("../realm-treasury/dto/RealmTreasury");
const realm_treasury_service_1 = require("../realm-treasury/realm-treasury.service");
const User_1 = require("../user/dto/User");
const Realm_1 = require("./dto/Realm");
const RealmFaqItem_1 = require("./dto/RealmFaqItem");
const RealmTeamMember_1 = require("./dto/RealmTeamMember");
const RealmTokenDetails_1 = require("./dto/RealmTokenDetails");
const RealmInput_1 = require("./inputDto/RealmInput");
const realm_service_1 = require("./realm.service");
let RealmResolver = class RealmResolver {
    constructor(realmFeedItemGQLService, realmFeedItemService, realmGovernanceService, realmHubService, realmMemberService, realmProposalGqlService, realmService) {
        this.realmFeedItemGQLService = realmFeedItemGQLService;
        this.realmFeedItemService = realmFeedItemService;
        this.realmGovernanceService = realmGovernanceService;
        this.realmHubService = realmHubService;
        this.realmMemberService = realmMemberService;
        this.realmProposalGqlService = realmProposalGqlService;
        this.realmService = realmService;
    }
    amAdmin(realm, environment, user) {
        if (!user) {
            return false;
        }
        return this.realmService.userIsAdminMember(realm.publicKey, user.publicKey, environment);
    }
    clippedHeading(hub, charLimit = 400, attachmentLimit = 0) {
        return hub.heading
            ? (0, clipRichTextDocument_1.clipRichTextDocument)(hub.heading, charLimit, attachmentLimit)
            : hub.heading;
    }
    feed(args, sort = pagination_1.RealmFeedItemSort.Relevance, realm, environment, user) {
        return this.realmFeedItemGQLService.getGQLFeedItemsList(realm.publicKey, user, sort, environment, args.after, args.before, args.first, args.last);
    }
    async governance(governance, realm, environment) {
        if (!realm.programPublicKey) {
            throw new errors.MalformedData();
        }
        return this.realmGovernanceService.getGovernanceRules(realm.programPublicKey, governance, environment);
    }
    pinnedFeedItems(realm, environment, user) {
        return this.realmFeedItemService.getPinnedFeedItems(realm.publicKey, user, environment);
    }
    members(args, sort = pagination_2.RealmMemberSort.Alphabetical, realm, environment) {
        return this.realmMemberService.getGQLMemberList(realm.publicKey, sort, environment, args.after, args.before, args.first, args.last);
    }
    membersCount(realm, environment) {
        return this.realmMemberService.getMembersCountForRealm(realm.publicKey, environment);
    }
    proposals(args, sort = pagination_3.RealmProposalSort.Time, realm, environment, user) {
        return this.realmProposalGqlService.getGQLProposalList(realm.publicKey, user ? user.publicKey : null, sort, environment, args.after, args.before, args.first, args.last);
    }
    treasury(realm) {
        return { belongsTo: realm.publicKey };
    }
    twitterFollowerCount(realm, environment) {
        return this.realmHubService.getTwitterFollowerCount(realm.publicKey, environment);
    }
    canAssignSymbolToRealm(realm, symbol) {
        return this.realmService.newSymbolIsValid(realm, symbol);
    }
    realm(publicKey, environment) {
        return this.realmService.getRealm(publicKey, environment);
    }
    realmByUrlId(id, environment) {
        return this.realmService.getRealmByUrlId(id, environment);
    }
    realmDropdownList(environment) {
        return this.realmService.getRealmDropdownList(environment);
    }
    followRealm(realm, environment, user) {
        if (!user) {
            throw new errors.Unauthorized();
        }
        return this.realmService.followRealm(realm, user, environment);
    }
    unfollowRealm(realm, environment, user) {
        if (!user) {
            throw new errors.Unauthorized();
        }
        return this.realmService.unfollowRealm(realm, user, environment);
    }
    updateRealmMetadata(publicKey, realm, environment, user) {
        if (!user) {
            throw new errors.Unauthorized();
        }
        return this.realmService.updateRealm(user, publicKey, environment, realm);
    }
};
__decorate([
    (0, graphql_1.ResolveField)(() => Boolean, {
        description: 'If the requesting user is an admin of the Realm',
    }),
    __param(0, (0, graphql_1.Root)()),
    __param(1, (0, CurrentEnvironment_1.CurrentEnvironment)()),
    __param(2, (0, CurrentUser_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Realm_1.Realm, String, Object]),
    __metadata("design:returntype", void 0)
], RealmResolver.prototype, "amAdmin", null);
__decorate([
    (0, graphql_1.ResolveField)(() => ClippedRichTextDocument_1.ClippedRichTextDocument, {
        description: 'A clipped heading',
        nullable: true,
    }),
    __param(0, (0, graphql_1.Root)()),
    __param(1, (0, graphql_1.Args)('charLimit', {
        type: () => graphql_1.Int,
        description: 'The character count to clip the document at',
        nullable: true,
        defaultValue: 400,
    })),
    __param(2, (0, graphql_1.Args)('attachmentLimit', {
        type: () => graphql_1.Int,
        description: 'The maximum number of attachments to include',
        nullable: true,
        defaultValue: 0,
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Realm_1.Realm, Object, Object]),
    __metadata("design:returntype", void 0)
], RealmResolver.prototype, "clippedHeading", null);
__decorate([
    (0, graphql_1.ResolveField)(() => pagination_1.RealmFeedItemConnection, {
        description: 'Realm feed',
    }),
    (0, EitherResolver_1.EitherResolver)(),
    __param(0, (0, graphql_1.Args)()),
    __param(1, (0, graphql_1.Args)('sort', {
        type: () => pagination_1.RealmFeedItemSort,
        description: 'Sort order for the feed',
        defaultValue: pagination_1.RealmFeedItemSort.Relevance,
        nullable: true,
    })),
    __param(2, (0, graphql_1.Root)()),
    __param(3, (0, CurrentEnvironment_1.CurrentEnvironment)()),
    __param(4, (0, CurrentUser_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Connection_1.ConnectionArgs, String, Realm_1.Realm, String, Object]),
    __metadata("design:returntype", void 0)
], RealmResolver.prototype, "feed", null);
__decorate([
    (0, graphql_1.ResolveField)(() => GovernanceRules_1.GovernanceRules, {
        description: 'A governance in a Realm',
    }),
    __param(0, (0, graphql_1.Args)('governance', {
        type: () => PublicKey_1.PublicKeyScalar,
        description: 'The address of the governance',
    })),
    __param(1, (0, graphql_1.Root)()),
    __param(2, (0, CurrentEnvironment_1.CurrentEnvironment)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [web3_js_1.PublicKey,
        Realm_1.Realm, String]),
    __metadata("design:returntype", Promise)
], RealmResolver.prototype, "governance", null);
__decorate([
    (0, graphql_1.ResolveField)(() => [RealmFeedItem_1.RealmFeedItem], {
        description: 'A list of pinned feed items',
    }),
    __param(0, (0, graphql_1.Root)()),
    __param(1, (0, CurrentEnvironment_1.CurrentEnvironment)()),
    __param(2, (0, CurrentUser_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Realm_1.Realm, String, Object]),
    __metadata("design:returntype", void 0)
], RealmResolver.prototype, "pinnedFeedItems", null);
__decorate([
    (0, graphql_1.ResolveField)(() => pagination_2.RealmMemberConnection, {
        description: 'List of members in the realm',
    }),
    (0, EitherResolver_1.EitherResolver)(),
    __param(0, (0, graphql_1.Args)()),
    __param(1, (0, graphql_1.Args)('sort', {
        type: () => pagination_2.RealmMemberSort,
        description: 'Sort order for the list',
        defaultValue: pagination_2.RealmMemberSort.Alphabetical,
        nullable: true,
    })),
    __param(2, (0, graphql_1.Root)()),
    __param(3, (0, CurrentEnvironment_1.CurrentEnvironment)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Connection_1.ConnectionArgs, String, Realm_1.Realm, String]),
    __metadata("design:returntype", void 0)
], RealmResolver.prototype, "members", null);
__decorate([
    (0, graphql_1.ResolveField)(() => graphql_1.Int, {
        description: 'Count of the number of members in this Realm',
    }),
    __param(0, (0, graphql_1.Root)()),
    __param(1, (0, CurrentEnvironment_1.CurrentEnvironment)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Realm_1.Realm, String]),
    __metadata("design:returntype", void 0)
], RealmResolver.prototype, "membersCount", null);
__decorate([
    (0, graphql_1.ResolveField)(() => pagination_3.RealmProposalConnection, {
        description: 'List of proposals in the realm',
    }),
    (0, EitherResolver_1.EitherResolver)(),
    __param(0, (0, graphql_1.Args)()),
    __param(1, (0, graphql_1.Args)('sort', {
        type: () => pagination_3.RealmProposalSort,
        description: 'Sort order for the list',
        defaultValue: pagination_3.RealmProposalSort.Time,
        nullable: true,
    })),
    __param(2, (0, graphql_1.Root)()),
    __param(3, (0, CurrentEnvironment_1.CurrentEnvironment)()),
    __param(4, (0, CurrentUser_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Connection_1.ConnectionArgs, String, Realm_1.Realm, String, Object]),
    __metadata("design:returntype", void 0)
], RealmResolver.prototype, "proposals", null);
__decorate([
    (0, graphql_1.ResolveField)(() => RealmTreasury_1.RealmTreasury, {
        description: "The realm's treasury",
    }),
    __param(0, (0, graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Realm_1.Realm]),
    __metadata("design:returntype", void 0)
], RealmResolver.prototype, "treasury", null);
__decorate([
    (0, graphql_1.ResolveField)(() => graphql_1.Int, {
        description: 'Number of twitter followers',
    }),
    __param(0, (0, graphql_1.Root)()),
    __param(1, (0, CurrentEnvironment_1.CurrentEnvironment)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Realm_1.Realm, String]),
    __metadata("design:returntype", void 0)
], RealmResolver.prototype, "twitterFollowerCount", null);
__decorate([
    (0, graphql_1.Query)(() => Boolean, {
        description: 'Determines if a Realm can be assigned a given symbol',
    }),
    __param(0, (0, graphql_1.Args)('realm', {
        description: 'The public key of the Realm',
        type: () => PublicKey_1.PublicKeyScalar,
    })),
    __param(1, (0, graphql_1.Args)('symbol', {
        description: 'The symbol to check',
        type: () => String,
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [web3_js_1.PublicKey, String]),
    __metadata("design:returntype", void 0)
], RealmResolver.prototype, "canAssignSymbolToRealm", null);
__decorate([
    (0, graphql_1.Query)(() => Realm_1.Realm, {
        description: 'A Realm',
    }),
    __param(0, (0, graphql_1.Args)('publicKey', {
        description: 'The public key of the Realm',
        type: () => PublicKey_1.PublicKeyScalar,
    })),
    __param(1, (0, CurrentEnvironment_1.CurrentEnvironment)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [web3_js_1.PublicKey, String]),
    __metadata("design:returntype", void 0)
], RealmResolver.prototype, "realm", null);
__decorate([
    (0, graphql_1.Query)(() => Realm_1.Realm, {
        description: 'A Realm (by its `urlId`)',
    }),
    __param(0, (0, graphql_1.Args)('urlId', {
        description: 'The id of the Realm as represented in the url',
        type: () => String,
    })),
    __param(1, (0, CurrentEnvironment_1.CurrentEnvironment)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], RealmResolver.prototype, "realmByUrlId", null);
__decorate([
    (0, graphql_1.Query)(() => [Realm_1.Realm], {
        description: 'A list of Realms to display in a dropdown',
    }),
    __param(0, (0, CurrentEnvironment_1.CurrentEnvironment)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RealmResolver.prototype, "realmDropdownList", null);
__decorate([
    (0, graphql_1.Mutation)(() => User_1.User, {
        description: 'Follow a Realm',
    }),
    __param(0, (0, graphql_1.Args)('publicKey', {
        description: 'The public key of the Realm',
        type: () => PublicKey_1.PublicKeyScalar,
    })),
    __param(1, (0, CurrentEnvironment_1.CurrentEnvironment)()),
    __param(2, (0, CurrentUser_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [web3_js_1.PublicKey, String, Object]),
    __metadata("design:returntype", void 0)
], RealmResolver.prototype, "followRealm", null);
__decorate([
    (0, graphql_1.Mutation)(() => User_1.User, {
        description: 'Unfollow a Realm',
    }),
    __param(0, (0, graphql_1.Args)('publicKey', {
        description: 'The public key of the Realm',
        type: () => PublicKey_1.PublicKeyScalar,
    })),
    __param(1, (0, CurrentEnvironment_1.CurrentEnvironment)()),
    __param(2, (0, CurrentUser_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [web3_js_1.PublicKey, String, Object]),
    __metadata("design:returntype", void 0)
], RealmResolver.prototype, "unfollowRealm", null);
__decorate([
    (0, graphql_1.Mutation)(() => Realm_1.Realm, {
        description: 'Update realm metadata',
    }),
    __param(0, (0, graphql_1.Args)('publicKey', {
        description: 'The public key of the Realm',
        type: () => PublicKey_1.PublicKeyScalar,
    })),
    __param(1, (0, graphql_1.Args)('realm', {
        description: 'The new Realm metadata',
        type: () => RealmInput_1.RealmInput,
    })),
    __param(2, (0, CurrentEnvironment_1.CurrentEnvironment)()),
    __param(3, (0, CurrentUser_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [web3_js_1.PublicKey,
        RealmInput_1.RealmInput, String, Object]),
    __metadata("design:returntype", void 0)
], RealmResolver.prototype, "updateRealmMetadata", null);
RealmResolver = __decorate([
    (0, graphql_1.Resolver)(() => Realm_1.Realm),
    __metadata("design:paramtypes", [realm_feed_item_gql_service_1.RealmFeedItemGQLService,
        realm_feed_item_service_1.RealmFeedItemService,
        realm_governance_service_1.RealmGovernanceService,
        realm_hub_service_1.RealmHubService,
        realm_member_service_1.RealmMemberService,
        realm_proposal_gql_service_1.RealmProposalGQLService,
        realm_service_1.RealmService])
], RealmResolver);
exports.RealmResolver = RealmResolver;
let RealmFaqItemResolver = class RealmFaqItemResolver {
    clippedAnswer(faqItem, charLimit = 400, attachmentLimit = 0) {
        return (0, clipRichTextDocument_1.clipRichTextDocument)(faqItem.answer, charLimit, attachmentLimit);
    }
};
__decorate([
    (0, graphql_1.ResolveField)(() => ClippedRichTextDocument_1.ClippedRichTextDocument, {
        description: 'A clipped answer to a FAQ item question',
    }),
    __param(0, (0, graphql_1.Root)()),
    __param(1, (0, graphql_1.Args)('charLimit', {
        type: () => graphql_1.Int,
        description: 'The character count to clip the document at',
        nullable: true,
        defaultValue: 400,
    })),
    __param(2, (0, graphql_1.Args)('attachmentLimit', {
        type: () => graphql_1.Int,
        description: 'The maximum number of attachments to include',
        nullable: true,
        defaultValue: 0,
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RealmFaqItem_1.RealmFaqItem, Object, Object]),
    __metadata("design:returntype", void 0)
], RealmFaqItemResolver.prototype, "clippedAnswer", null);
RealmFaqItemResolver = __decorate([
    (0, graphql_1.Resolver)(() => RealmFaqItem_1.RealmFaqItem)
], RealmFaqItemResolver);
exports.RealmFaqItemResolver = RealmFaqItemResolver;
let RealmTokenDetailsResolver = class RealmTokenDetailsResolver {
    constructor(realmTreasuryService) {
        this.realmTreasuryService = realmTreasuryService;
    }
    async price(token, environment) {
        const price = await Promise.race([
            this.realmTreasuryService.getTokenPrice(token.mint, environment)(),
            (0, wait_1.wait)(2000),
        ]).catch(() => 0);
        if (typeof price === 'boolean') {
            return 0;
        }
        if (typeof price === 'number') {
            return price;
        }
        if (EI.isLeft(price)) {
            throw price.left;
        }
        return price.right;
    }
    async symbol(token, environment) {
        const allTokens = await this.realmTreasuryService.fetchTokenListDict(environment)();
        if (EI.isLeft(allTokens)) {
            throw allTokens.left;
        }
        const tokenDetails = allTokens.right[token.mint.toBase58()];
        return (tokenDetails === null || tokenDetails === void 0 ? void 0 : tokenDetails.symbol) || (0, abbreviateAddress_1.abbreviateAddress)(token.mint);
    }
};
__decorate([
    (0, graphql_1.ResolveField)(() => Number, {
        description: 'Current price of the token',
    }),
    __param(0, (0, graphql_1.Root)()),
    __param(1, (0, CurrentEnvironment_1.CurrentEnvironment)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RealmTokenDetails_1.RealmTokenDetails, String]),
    __metadata("design:returntype", Promise)
], RealmTokenDetailsResolver.prototype, "price", null);
__decorate([
    (0, graphql_1.ResolveField)(() => String, {
        description: 'Symbol for the token',
    }),
    __param(0, (0, graphql_1.Root)()),
    __param(1, (0, CurrentEnvironment_1.CurrentEnvironment)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RealmTokenDetails_1.RealmTokenDetails, String]),
    __metadata("design:returntype", Promise)
], RealmTokenDetailsResolver.prototype, "symbol", null);
RealmTokenDetailsResolver = __decorate([
    (0, graphql_1.Resolver)(() => RealmTokenDetails_1.RealmTokenDetails),
    __metadata("design:paramtypes", [realm_treasury_service_1.RealmTreasuryService])
], RealmTokenDetailsResolver);
exports.RealmTokenDetailsResolver = RealmTokenDetailsResolver;
let RealmTeamMemberResolver = class RealmTeamMemberResolver {
    constructor(realmHubService) {
        this.realmHubService = realmHubService;
    }
    twitterFollowerCount(member) {
        if (member.twitter) {
            return this.realmHubService.getTwitterFollowerCountForHandle(member.twitter);
        }
        return 0;
    }
};
__decorate([
    (0, graphql_1.ResolveField)(() => graphql_1.Int, {
        description: 'Number of twitter followers',
    }),
    __param(0, (0, graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RealmTeamMember_1.RealmTeamMember]),
    __metadata("design:returntype", void 0)
], RealmTeamMemberResolver.prototype, "twitterFollowerCount", null);
RealmTeamMemberResolver = __decorate([
    (0, graphql_1.Resolver)(() => RealmTeamMember_1.RealmTeamMember),
    __metadata("design:paramtypes", [realm_hub_service_1.RealmHubService])
], RealmTeamMemberResolver);
exports.RealmTeamMemberResolver = RealmTeamMemberResolver;
//# sourceMappingURL=realm.resolver.js.map