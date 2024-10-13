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
exports.RealmHubInfoTeamMemberResolver = exports.RealmHubInfoTokenDetailsResolver = exports.RealmHubInfoFaqItemResolver = exports.RealmHubInfoResolver = exports.RealmHubResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const web3_js_1 = require("@solana/web3.js");
const EI = require("fp-ts/Either");
const CurrentEnvironment_1 = require("../lib/decorators/CurrentEnvironment");
const PublicKey_1 = require("../lib/scalars/PublicKey");
const abbreviateAddress_1 = require("../lib/textManipulation/abbreviateAddress");
const ClippedRichTextDocument_1 = require("../lib/gqlTypes/ClippedRichTextDocument");
const clipRichTextDocument_1 = require("../lib/textManipulation/clipRichTextDocument");
const wait_1 = require("../lib/wait");
const realm_treasury_service_1 = require("../realm-treasury/realm-treasury.service");
const RealmHub_1 = require("./dto/RealmHub");
const RealmHubInfo_1 = require("./dto/RealmHubInfo");
const RealmHubInfoFaqItem_1 = require("./dto/RealmHubInfoFaqItem");
const RealmHubInfoTeamMember_1 = require("./dto/RealmHubInfoTeamMember");
const RealmHubInfoTokenDetails_1 = require("./dto/RealmHubInfoTokenDetails");
const realm_hub_service_1 = require("./realm-hub.service");
let RealmHubResolver = class RealmHubResolver {
    constructor(realmHubService) {
        this.realmHubService = realmHubService;
    }
    info(hub, environment) {
        return this.realmHubService.getCodeCommittedHubInfoForRealm(hub.realm, environment);
    }
    twitterFollowerCount(hub, environment) {
        return this.realmHubService.getTwitterFollowerCount(hub.realm, environment);
    }
    hub(realm) {
        return { realm };
    }
};
__decorate([
    (0, graphql_1.ResolveField)(() => RealmHubInfo_1.RealmHubInfo, {
        description: 'Info for the Realm',
    }),
    __param(0, (0, graphql_1.Root)()),
    __param(1, (0, CurrentEnvironment_1.CurrentEnvironment)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RealmHub_1.RealmHub, String]),
    __metadata("design:returntype", void 0)
], RealmHubResolver.prototype, "info", null);
__decorate([
    (0, graphql_1.ResolveField)(() => graphql_1.Int, {
        description: 'Number of twitter followers',
    }),
    __param(0, (0, graphql_1.Root)()),
    __param(1, (0, CurrentEnvironment_1.CurrentEnvironment)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RealmHub_1.RealmHub, String]),
    __metadata("design:returntype", void 0)
], RealmHubResolver.prototype, "twitterFollowerCount", null);
__decorate([
    (0, graphql_1.Query)(() => RealmHub_1.RealmHub, {
        description: 'A Realm Hub',
    }),
    __param(0, (0, graphql_1.Args)('realm', {
        description: 'The public key of the Realm the hub belongs to',
        type: () => PublicKey_1.PublicKeyScalar,
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [web3_js_1.PublicKey]),
    __metadata("design:returntype", void 0)
], RealmHubResolver.prototype, "hub", null);
RealmHubResolver = __decorate([
    (0, graphql_1.Resolver)(() => RealmHub_1.RealmHub),
    __metadata("design:paramtypes", [realm_hub_service_1.RealmHubService])
], RealmHubResolver);
exports.RealmHubResolver = RealmHubResolver;
let RealmHubInfoResolver = class RealmHubInfoResolver {
    clippedHeading(hub, charLimit = 400, attachmentLimit = 0) {
        return hub.heading
            ? (0, clipRichTextDocument_1.clipRichTextDocument)(hub.heading, charLimit, attachmentLimit)
            : hub.heading;
    }
};
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
    __metadata("design:paramtypes", [RealmHubInfo_1.RealmHubInfo, Object, Object]),
    __metadata("design:returntype", void 0)
], RealmHubInfoResolver.prototype, "clippedHeading", null);
RealmHubInfoResolver = __decorate([
    (0, graphql_1.Resolver)(() => RealmHubInfo_1.RealmHubInfo)
], RealmHubInfoResolver);
exports.RealmHubInfoResolver = RealmHubInfoResolver;
let RealmHubInfoFaqItemResolver = class RealmHubInfoFaqItemResolver {
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
    __metadata("design:paramtypes", [RealmHubInfoFaqItem_1.RealmHubInfoFaqItem, Object, Object]),
    __metadata("design:returntype", void 0)
], RealmHubInfoFaqItemResolver.prototype, "clippedAnswer", null);
RealmHubInfoFaqItemResolver = __decorate([
    (0, graphql_1.Resolver)(() => RealmHubInfoFaqItem_1.RealmHubInfoFaqItem)
], RealmHubInfoFaqItemResolver);
exports.RealmHubInfoFaqItemResolver = RealmHubInfoFaqItemResolver;
let RealmHubInfoTokenDetailsResolver = class RealmHubInfoTokenDetailsResolver {
    constructor(realmHubService, realmTreasuryService) {
        this.realmHubService = realmHubService;
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
    __metadata("design:paramtypes", [RealmHubInfoTokenDetails_1.RealmHubInfoTokenDetails, String]),
    __metadata("design:returntype", Promise)
], RealmHubInfoTokenDetailsResolver.prototype, "price", null);
__decorate([
    (0, graphql_1.ResolveField)(() => String, {
        description: 'Symbol for the token',
    }),
    __param(0, (0, graphql_1.Root)()),
    __param(1, (0, CurrentEnvironment_1.CurrentEnvironment)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RealmHubInfoTokenDetails_1.RealmHubInfoTokenDetails, String]),
    __metadata("design:returntype", Promise)
], RealmHubInfoTokenDetailsResolver.prototype, "symbol", null);
RealmHubInfoTokenDetailsResolver = __decorate([
    (0, graphql_1.Resolver)(() => RealmHubInfoTokenDetails_1.RealmHubInfoTokenDetails),
    __metadata("design:paramtypes", [realm_hub_service_1.RealmHubService,
        realm_treasury_service_1.RealmTreasuryService])
], RealmHubInfoTokenDetailsResolver);
exports.RealmHubInfoTokenDetailsResolver = RealmHubInfoTokenDetailsResolver;
let RealmHubInfoTeamMemberResolver = class RealmHubInfoTeamMemberResolver {
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
    __metadata("design:paramtypes", [RealmHubInfoTeamMember_1.RealmHubInfoTeamMember]),
    __metadata("design:returntype", void 0)
], RealmHubInfoTeamMemberResolver.prototype, "twitterFollowerCount", null);
RealmHubInfoTeamMemberResolver = __decorate([
    (0, graphql_1.Resolver)(() => RealmHubInfoTeamMember_1.RealmHubInfoTeamMember),
    __metadata("design:paramtypes", [realm_hub_service_1.RealmHubService])
], RealmHubInfoTeamMemberResolver);
exports.RealmHubInfoTeamMemberResolver = RealmHubInfoTeamMemberResolver;
//# sourceMappingURL=realm-hub.resolver.js.map