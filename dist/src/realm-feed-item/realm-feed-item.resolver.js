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
exports.RealmFeedItemResolver = exports.RealmFeedItemProposalResolver = exports.RealmFeedItemPostResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const web3_js_1 = require("@solana/web3.js");
const EI = require("fp-ts/Either");
const FN = require("fp-ts/function");
const TE = require("fp-ts/TaskEither");
const CurrentEnvironment_1 = require("../lib/decorators/CurrentEnvironment");
const CurrentUser_1 = require("../lib/decorators/CurrentUser");
const EitherResolver_1 = require("../lib/decorators/EitherResolver");
const errors = require("../lib/errors/gql");
const PublicKey_1 = require("../lib/scalars/PublicKey");
const RichTextDocument_1 = require("../lib/scalars/RichTextDocument");
const auth_jwt_guard_1 = require("../auth/auth.jwt.guard");
const ClippedRichTextDocument_1 = require("../lib/gqlTypes/ClippedRichTextDocument");
const Connection_1 = require("../lib/gqlTypes/Connection");
const RealmFeedItemID_1 = require("../lib/scalars/RealmFeedItemID");
const clipRichTextDocument_1 = require("../lib/textManipulation/clipRichTextDocument");
const pagination_1 = require("../realm-feed-item-comment/dto/pagination");
const pagination_2 = require("../realm-feed-item-comment/dto/pagination");
const realm_feed_item_comment_service_1 = require("../realm-feed-item-comment/realm-feed-item-comment.service");
const Realm_1 = require("../realm/dto/Realm");
const realm_service_1 = require("../realm/realm.service");
const RealmFeedItem_1 = require("./dto/RealmFeedItem");
const RealmFeedItemVoteType_1 = require("./dto/RealmFeedItemVoteType");
const realm_feed_item_service_1 = require("./realm-feed-item.service");
let RealmFeedItemPostResolver = class RealmFeedItemPostResolver {
    constructor(realmService, realmFeedItemCommentService) {
        this.realmService = realmService;
        this.realmFeedItemCommentService = realmFeedItemCommentService;
    }
    clippedDocument(charLimit = 400, attachmentLimit = 0, post) {
        return FN.pipe(EI.tryCatch(() => (0, clipRichTextDocument_1.clipRichTextDocument)(post.document, charLimit, attachmentLimit), (e) => new errors.Exception(e)));
    }
    commentTree(args, post, environment, user, depth = 3, sort = pagination_2.RealmFeedItemCommentSort.Relevance) {
        if (depth < 1) {
            return TE.left(new errors.MalformedRequest());
        }
        return this.realmFeedItemCommentService.getCommentTreeForFeedItem({
            after: args.after ? args.after : undefined,
            before: args.before ? args.before : undefined,
            first: args.first,
            last: args.last,
            depth,
            environment,
            sort,
            feedItemId: post.id,
            requestingUser: user,
        });
    }
    numComments(post, environment) {
        return this.realmFeedItemCommentService.getCommentCountForFeedItem({
            environment,
            feedItemId: post.id,
        });
    }
    realm(post, environment) {
        return this.realmService.getRealm(post.realmPublicKey, environment);
    }
};
__decorate([
    (0, graphql_1.ResolveField)(() => ClippedRichTextDocument_1.ClippedRichTextDocument, {
        description: 'A clipped version of the post document',
    }),
    (0, EitherResolver_1.EitherResolver)(),
    __param(0, (0, graphql_1.Args)('charLimit', {
        type: () => graphql_1.Int,
        description: 'The character count to clip the document at',
        nullable: true,
        defaultValue: 400,
    })),
    __param(1, (0, graphql_1.Args)('attachmentLimit', {
        type: () => graphql_1.Int,
        description: 'The maximum number of attachments to include',
        nullable: true,
        defaultValue: 0,
    })),
    __param(2, (0, graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, RealmFeedItem_1.RealmFeedItemPost]),
    __metadata("design:returntype", void 0)
], RealmFeedItemPostResolver.prototype, "clippedDocument", null);
__decorate([
    (0, graphql_1.ResolveField)(() => pagination_1.RealmFeedItemCommentConnection, {
        description: 'The comment tree for this post',
    }),
    (0, EitherResolver_1.EitherResolver)(),
    __param(0, (0, graphql_1.Args)()),
    __param(1, (0, graphql_1.Root)()),
    __param(2, (0, CurrentEnvironment_1.CurrentEnvironment)()),
    __param(3, (0, CurrentUser_1.CurrentUser)()),
    __param(4, (0, graphql_1.Args)('depth', {
        type: () => Number,
        defaultValue: 3,
        description: 'The tree depth. Min is 1',
        nullable: true,
    })),
    __param(5, (0, graphql_1.Args)('sort', {
        type: () => pagination_2.RealmFeedItemCommentSort,
        description: 'Sort order for the comment tree',
        defaultValue: pagination_2.RealmFeedItemCommentSort.Relevance,
        nullable: true,
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Connection_1.ConnectionArgs,
        RealmFeedItem_1.RealmFeedItemPost, String, Object, Object, String]),
    __metadata("design:returntype", void 0)
], RealmFeedItemPostResolver.prototype, "commentTree", null);
__decorate([
    (0, graphql_1.ResolveField)(() => Number, {
        description: 'A count of comments in the post',
    }),
    (0, EitherResolver_1.EitherResolver)(),
    __param(0, (0, graphql_1.Root)()),
    __param(1, (0, CurrentEnvironment_1.CurrentEnvironment)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RealmFeedItem_1.RealmFeedItemPost, String]),
    __metadata("design:returntype", void 0)
], RealmFeedItemPostResolver.prototype, "numComments", null);
__decorate([
    (0, graphql_1.ResolveField)(() => Realm_1.Realm, {
        description: 'The realm the post is in',
    }),
    __param(0, (0, graphql_1.Root)()),
    __param(1, (0, CurrentEnvironment_1.CurrentEnvironment)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RealmFeedItem_1.RealmFeedItemPost, String]),
    __metadata("design:returntype", void 0)
], RealmFeedItemPostResolver.prototype, "realm", null);
RealmFeedItemPostResolver = __decorate([
    (0, graphql_1.Resolver)(() => RealmFeedItem_1.RealmFeedItemPost),
    __metadata("design:paramtypes", [realm_service_1.RealmService,
        realm_feed_item_comment_service_1.RealmFeedItemCommentService])
], RealmFeedItemPostResolver);
exports.RealmFeedItemPostResolver = RealmFeedItemPostResolver;
let RealmFeedItemProposalResolver = class RealmFeedItemProposalResolver {
    constructor(realmService, realmFeedItemCommentService) {
        this.realmService = realmService;
        this.realmFeedItemCommentService = realmFeedItemCommentService;
    }
    clippedDocument(charLimit = 400, attachmentLimit = 0, proposal) {
        return FN.pipe(EI.tryCatch(() => (0, clipRichTextDocument_1.clipRichTextDocument)(proposal.document, charLimit, attachmentLimit), (e) => new errors.Exception(e)));
    }
    commentTree(args, proposal, environment, user, depth = 3, sort = pagination_2.RealmFeedItemCommentSort.Relevance) {
        if (depth < 1) {
            return TE.left(new errors.MalformedRequest());
        }
        return this.realmFeedItemCommentService.getCommentTreeForFeedItem({
            after: args.after ? args.after : undefined,
            before: args.before ? args.before : undefined,
            first: args.first,
            last: args.last,
            depth,
            environment,
            sort,
            feedItemId: proposal.id,
            requestingUser: user,
        });
    }
    numComments(proposal, environment) {
        return this.realmFeedItemCommentService.getCommentCountForFeedItem({
            environment,
            feedItemId: proposal.id,
        });
    }
    realm(proposal, environment) {
        return this.realmService.getRealm(proposal.realmPublicKey, environment);
    }
};
__decorate([
    (0, graphql_1.ResolveField)(() => ClippedRichTextDocument_1.ClippedRichTextDocument, {
        description: 'A clipped version of the proposal document',
    }),
    (0, EitherResolver_1.EitherResolver)(),
    __param(0, (0, graphql_1.Args)('charLimit', {
        type: () => graphql_1.Int,
        description: 'The character count to clip the document at',
        nullable: true,
        defaultValue: 400,
    })),
    __param(1, (0, graphql_1.Args)('attachmentLimit', {
        type: () => graphql_1.Int,
        description: 'The maximum number of attachments to include',
        nullable: true,
        defaultValue: 0,
    })),
    __param(2, (0, graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, RealmFeedItem_1.RealmFeedItemProposal]),
    __metadata("design:returntype", void 0)
], RealmFeedItemProposalResolver.prototype, "clippedDocument", null);
__decorate([
    (0, graphql_1.ResolveField)(() => pagination_1.RealmFeedItemCommentConnection, {
        description: 'The comment tree for this proposal',
    }),
    (0, EitherResolver_1.EitherResolver)(),
    __param(0, (0, graphql_1.Args)()),
    __param(1, (0, graphql_1.Root)()),
    __param(2, (0, CurrentEnvironment_1.CurrentEnvironment)()),
    __param(3, (0, CurrentUser_1.CurrentUser)()),
    __param(4, (0, graphql_1.Args)('depth', {
        type: () => Number,
        defaultValue: 3,
        description: 'The tree depth. Min is 1',
        nullable: true,
    })),
    __param(5, (0, graphql_1.Args)('sort', {
        type: () => pagination_2.RealmFeedItemCommentSort,
        description: 'Sort order for the comment tree',
        defaultValue: pagination_2.RealmFeedItemCommentSort.Relevance,
        nullable: true,
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Connection_1.ConnectionArgs,
        RealmFeedItem_1.RealmFeedItemProposal, String, Object, Object, String]),
    __metadata("design:returntype", void 0)
], RealmFeedItemProposalResolver.prototype, "commentTree", null);
__decorate([
    (0, graphql_1.ResolveField)(() => Number, {
        description: 'A count of comments in the proposal',
    }),
    (0, EitherResolver_1.EitherResolver)(),
    __param(0, (0, graphql_1.Root)()),
    __param(1, (0, CurrentEnvironment_1.CurrentEnvironment)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RealmFeedItem_1.RealmFeedItemProposal, String]),
    __metadata("design:returntype", void 0)
], RealmFeedItemProposalResolver.prototype, "numComments", null);
__decorate([
    (0, graphql_1.ResolveField)(() => Realm_1.Realm, {
        description: 'The realm the proposal is in',
    }),
    __param(0, (0, graphql_1.Root)()),
    __param(1, (0, CurrentEnvironment_1.CurrentEnvironment)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RealmFeedItem_1.RealmFeedItemProposal, String]),
    __metadata("design:returntype", void 0)
], RealmFeedItemProposalResolver.prototype, "realm", null);
RealmFeedItemProposalResolver = __decorate([
    (0, graphql_1.Resolver)(() => RealmFeedItem_1.RealmFeedItemProposal),
    __metadata("design:paramtypes", [realm_service_1.RealmService,
        realm_feed_item_comment_service_1.RealmFeedItemCommentService])
], RealmFeedItemProposalResolver);
exports.RealmFeedItemProposalResolver = RealmFeedItemProposalResolver;
let RealmFeedItemResolver = class RealmFeedItemResolver {
    constructor(realmFeedItemService) {
        this.realmFeedItemService = realmFeedItemService;
    }
    feedItem(realm, id, environment, user) {
        return this.realmFeedItemService.getFeedItem(realm, id, user, environment);
    }
    feedItems(ids, environment, user) {
        return this.realmFeedItemService.getFeedItems(ids, user, environment);
    }
    pinnedFeedItems(realm, environment, user) {
        return this.realmFeedItemService.getPinnedFeedItems(realm, user, environment);
    }
    createPost(document, realm, title, environment, user, crosspostTo) {
        return this.realmFeedItemService.createPost({
            crosspostTo,
            document,
            environment,
            title,
            requestingUser: user,
            realmPublicKey: realm,
        });
    }
    deletePost(realm, id, environment, user) {
        if (!user) {
            throw new errors.Unauthorized();
        }
        return this.realmFeedItemService.deletePost({
            environment,
            id,
            realmPublicKey: realm,
            requestingUser: user,
        });
    }
    voteOnFeedItem(realm, id, vote, environment, user) {
        return this.realmFeedItemService.submitVote(realm, id, vote, user, environment);
    }
};
__decorate([
    (0, graphql_1.Query)(() => RealmFeedItem_1.RealmFeedItem, {
        description: "An individual item in a Realm's feed",
    }),
    (0, EitherResolver_1.EitherResolver)(),
    __param(0, (0, graphql_1.Args)('realm', {
        type: () => PublicKey_1.PublicKeyScalar,
        description: 'Public key of the realm the feed item belongs in',
    })),
    __param(1, (0, graphql_1.Args)('id', {
        type: () => RealmFeedItemID_1.RealmFeedItemIDScalar,
        description: 'ID of the feed item',
    })),
    __param(2, (0, CurrentEnvironment_1.CurrentEnvironment)()),
    __param(3, (0, CurrentUser_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [web3_js_1.PublicKey, Number, String, Object]),
    __metadata("design:returntype", void 0)
], RealmFeedItemResolver.prototype, "feedItem", null);
__decorate([
    (0, graphql_1.Query)(() => [RealmFeedItem_1.RealmFeedItem], {
        description: 'A list of feed items',
    }),
    __param(0, (0, graphql_1.Args)('ids', {
        type: () => [RealmFeedItemID_1.RealmFeedItemIDScalar],
        description: 'ID of the feed item',
    })),
    __param(1, (0, CurrentEnvironment_1.CurrentEnvironment)()),
    __param(2, (0, CurrentUser_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, String, Object]),
    __metadata("design:returntype", void 0)
], RealmFeedItemResolver.prototype, "feedItems", null);
__decorate([
    (0, graphql_1.Query)(() => [RealmFeedItem_1.RealmFeedItem], {
        description: 'A list of feed items that have been pinned',
    }),
    __param(0, (0, graphql_1.Args)('realm', {
        type: () => PublicKey_1.PublicKeyScalar,
        description: 'Public key of the realm the feed item belongs in',
    })),
    __param(1, (0, CurrentEnvironment_1.CurrentEnvironment)()),
    __param(2, (0, CurrentUser_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [web3_js_1.PublicKey, String, Object]),
    __metadata("design:returntype", void 0)
], RealmFeedItemResolver.prototype, "pinnedFeedItems", null);
__decorate([
    (0, graphql_1.Mutation)(() => RealmFeedItem_1.RealmFeedItemPost, {
        description: 'Create a new Post',
    }),
    (0, common_1.UseGuards)(auth_jwt_guard_1.AuthJwtGuard),
    __param(0, (0, graphql_1.Args)('document', {
        type: () => RichTextDocument_1.RichTextDocumentScalar,
        description: 'Post content',
    })),
    __param(1, (0, graphql_1.Args)('realm', {
        type: () => PublicKey_1.PublicKeyScalar,
        description: 'Public key of the realm the post belongs in',
    })),
    __param(2, (0, graphql_1.Args)('title', {
        type: () => String,
        description: 'Title of the post',
    })),
    __param(3, (0, CurrentEnvironment_1.CurrentEnvironment)()),
    __param(4, (0, CurrentUser_1.CurrentUser)()),
    __param(5, (0, graphql_1.Args)('crosspostTo', {
        type: () => [PublicKey_1.PublicKeyScalar],
        description: 'Optional realms to crosspost to',
        nullable: true,
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, web3_js_1.PublicKey, String, String, Object, Object]),
    __metadata("design:returntype", void 0)
], RealmFeedItemResolver.prototype, "createPost", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean, {
        description: 'Delete a post',
    }),
    (0, common_1.UseGuards)(auth_jwt_guard_1.AuthJwtGuard),
    __param(0, (0, graphql_1.Args)('realm', {
        type: () => PublicKey_1.PublicKeyScalar,
        description: 'Public key of the realm the feed item belongs in',
    })),
    __param(1, (0, graphql_1.Args)('feedItemId', {
        type: () => RealmFeedItemID_1.RealmFeedItemIDScalar,
        description: 'The ID of the feed item being voted on',
    })),
    __param(2, (0, CurrentEnvironment_1.CurrentEnvironment)()),
    __param(3, (0, CurrentUser_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [web3_js_1.PublicKey, Number, String, Object]),
    __metadata("design:returntype", void 0)
], RealmFeedItemResolver.prototype, "deletePost", null);
__decorate([
    (0, graphql_1.Mutation)(() => RealmFeedItem_1.RealmFeedItem, {
        description: 'Approve or disapprove a feed item',
    }),
    (0, common_1.UseGuards)(auth_jwt_guard_1.AuthJwtGuard),
    (0, EitherResolver_1.EitherResolver)(),
    __param(0, (0, graphql_1.Args)('realm', {
        type: () => PublicKey_1.PublicKeyScalar,
        description: 'Public key of the realm the feed item belongs in',
    })),
    __param(1, (0, graphql_1.Args)('feedItemId', {
        type: () => RealmFeedItemID_1.RealmFeedItemIDScalar,
        description: 'The ID of the feed item being voted on',
    })),
    __param(2, (0, graphql_1.Args)('vote', {
        type: () => RealmFeedItemVoteType_1.RealmFeedItemVoteType,
        description: 'The type of vote',
    })),
    __param(3, (0, CurrentEnvironment_1.CurrentEnvironment)()),
    __param(4, (0, CurrentUser_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [web3_js_1.PublicKey, Number, String, String, Object]),
    __metadata("design:returntype", void 0)
], RealmFeedItemResolver.prototype, "voteOnFeedItem", null);
RealmFeedItemResolver = __decorate([
    (0, graphql_1.Resolver)(() => RealmFeedItem_1.RealmFeedItem),
    __metadata("design:paramtypes", [realm_feed_item_service_1.RealmFeedItemService])
], RealmFeedItemResolver);
exports.RealmFeedItemResolver = RealmFeedItemResolver;
//# sourceMappingURL=realm-feed-item.resolver.js.map