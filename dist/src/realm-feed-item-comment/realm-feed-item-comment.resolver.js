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
exports.RealmFeedItemCommentResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const web3_js_1 = require("@solana/web3.js");
const TE = require("fp-ts/TaskEither");
const CurrentEnvironment_1 = require("../lib/decorators/CurrentEnvironment");
const CurrentUser_1 = require("../lib/decorators/CurrentUser");
const EitherResolver_1 = require("../lib/decorators/EitherResolver");
const errors = require("../lib/errors/gql");
const Connection_1 = require("../lib/gqlTypes/Connection");
const PublicKey_1 = require("../lib/scalars/PublicKey");
const RichTextDocument_1 = require("../lib/scalars/RichTextDocument");
const auth_jwt_guard_1 = require("../auth/auth.jwt.guard");
const RealmFeedItemCommentID_1 = require("../lib/scalars/RealmFeedItemCommentID");
const RealmFeedItemID_1 = require("../lib/scalars/RealmFeedItemID");
const pagination_1 = require("./dto/pagination");
const RealmFeedItemComment_1 = require("./dto/RealmFeedItemComment");
const RealmFeedItemCommentVoteType_1 = require("./dto/RealmFeedItemCommentVoteType");
const realm_feed_item_comment_service_1 = require("./realm-feed-item-comment.service");
let RealmFeedItemCommentResolver = class RealmFeedItemCommentResolver {
    constructor(realmFeedItemCommentService) {
        this.realmFeedItemCommentService = realmFeedItemCommentService;
    }
    createFeedItemComment(document, feedItemId, parentCommentId, realm, environment, user) {
        return this.realmFeedItemCommentService.createComment({
            document,
            environment,
            feedItemId,
            parentCommentId,
            realmPublicKey: realm,
            requestingUser: user,
        });
    }
    deleteComment(realm, id, environment, user) {
        if (!user) {
            throw new errors.Unauthorized();
        }
        return this.realmFeedItemCommentService.deleteComment({
            environment,
            id,
            realmPublicKey: realm,
            requestingUser: user,
        });
    }
    feedItemComment(commentId, feedItemId, environment, user, depth = 3, sort = pagination_1.RealmFeedItemCommentSort.Relevance) {
        return this.realmFeedItemCommentService.getCommentTreeForComment({
            commentId,
            depth,
            environment,
            feedItemId,
            sort,
            requestingUser: user,
        });
    }
    feedItemCommentTree(args, feedItemId, environment, user, depth = 3, sort = pagination_1.RealmFeedItemCommentSort.Relevance) {
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
            feedItemId,
            sort,
            requestingUser: user,
        });
    }
    voteOnFeedItemComment(realm, id, vote, environment, user) {
        return this.realmFeedItemCommentService.submitVote({
            environment,
            id,
            realmPublicKey: realm,
            requestingUser: user,
            type: vote,
        });
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => RealmFeedItemComment_1.RealmFeedItemComment, {
        description: 'Create a new comment for a feed item',
    }),
    (0, common_1.UseGuards)(auth_jwt_guard_1.AuthJwtGuard),
    __param(0, (0, graphql_1.Args)('document', {
        type: () => RichTextDocument_1.RichTextDocumentScalar,
        description: 'Comment content',
    })),
    __param(1, (0, graphql_1.Args)('feedItemId', {
        type: () => RealmFeedItemID_1.RealmFeedItemIDScalar,
        description: 'The feed item the comment belongs to',
    })),
    __param(2, (0, graphql_1.Args)('parentCommentId', {
        type: () => RealmFeedItemCommentID_1.RealmFeedItemCommentIDScalar,
        description: 'If the comment is a reply to another comment, the id of the parent comment',
        nullable: true,
    })),
    __param(3, (0, graphql_1.Args)('realm', {
        type: () => PublicKey_1.PublicKeyScalar,
        description: 'Public key of the realm the post belongs in',
    })),
    __param(4, (0, CurrentEnvironment_1.CurrentEnvironment)()),
    __param(5, (0, CurrentUser_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Object, web3_js_1.PublicKey, String, Object]),
    __metadata("design:returntype", void 0)
], RealmFeedItemCommentResolver.prototype, "createFeedItemComment", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean, {
        description: 'Delete a comment',
    }),
    (0, common_1.UseGuards)(auth_jwt_guard_1.AuthJwtGuard),
    __param(0, (0, graphql_1.Args)('realm', {
        type: () => PublicKey_1.PublicKeyScalar,
        description: 'Public key of the realm the comment belongs in',
    })),
    __param(1, (0, graphql_1.Args)('commentId', {
        type: () => RealmFeedItemCommentID_1.RealmFeedItemCommentIDScalar,
        description: 'The ID of the comment being voted on',
    })),
    __param(2, (0, CurrentEnvironment_1.CurrentEnvironment)()),
    __param(3, (0, CurrentUser_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [web3_js_1.PublicKey, Number, String, Object]),
    __metadata("design:returntype", void 0)
], RealmFeedItemCommentResolver.prototype, "deleteComment", null);
__decorate([
    (0, graphql_1.Query)(() => RealmFeedItemComment_1.RealmFeedItemComment, {
        description: 'A comment on a feed item',
        nullable: true,
    }),
    (0, EitherResolver_1.EitherResolver)(),
    __param(0, (0, graphql_1.Args)('commentId', {
        type: () => RealmFeedItemCommentID_1.RealmFeedItemCommentIDScalar,
        description: 'The feed item comment',
    })),
    __param(1, (0, graphql_1.Args)('feedItemId', {
        type: () => RealmFeedItemID_1.RealmFeedItemIDScalar,
        description: 'The feed item the comment tree belongs to',
    })),
    __param(2, (0, CurrentEnvironment_1.CurrentEnvironment)()),
    __param(3, (0, CurrentUser_1.CurrentUser)()),
    __param(4, (0, graphql_1.Args)('depth', {
        type: () => Number,
        defaultValue: 3,
        description: 'The tree depth. Min is 1',
        nullable: true,
    })),
    __param(5, (0, graphql_1.Args)('sort', {
        type: () => pagination_1.RealmFeedItemCommentSort,
        description: 'Sort order for the comment tree',
        defaultValue: pagination_1.RealmFeedItemCommentSort.Relevance,
        nullable: true,
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, Object, Object, String]),
    __metadata("design:returntype", void 0)
], RealmFeedItemCommentResolver.prototype, "feedItemComment", null);
__decorate([
    (0, graphql_1.Query)(() => pagination_1.RealmFeedItemCommentConnection, {
        description: 'A comment tree for a feed item',
    }),
    (0, EitherResolver_1.EitherResolver)(),
    __param(0, (0, graphql_1.Args)()),
    __param(1, (0, graphql_1.Args)('feedItemId', {
        type: () => RealmFeedItemID_1.RealmFeedItemIDScalar,
        description: 'The feed item the comment tree belongs to',
    })),
    __param(2, (0, CurrentEnvironment_1.CurrentEnvironment)()),
    __param(3, (0, CurrentUser_1.CurrentUser)()),
    __param(4, (0, graphql_1.Args)('depth', {
        type: () => Number,
        defaultValue: 3,
        description: 'The tree depth. Min is 1',
        nullable: true,
    })),
    __param(5, (0, graphql_1.Args)('sort', {
        type: () => pagination_1.RealmFeedItemCommentSort,
        description: 'Sort order for the comment tree',
        defaultValue: pagination_1.RealmFeedItemCommentSort.Relevance,
        nullable: true,
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Connection_1.ConnectionArgs, Number, String, Object, Object, String]),
    __metadata("design:returntype", void 0)
], RealmFeedItemCommentResolver.prototype, "feedItemCommentTree", null);
__decorate([
    (0, graphql_1.Mutation)(() => RealmFeedItemComment_1.RealmFeedItemComment, {
        description: 'Approve or disapprove a feed item comment',
    }),
    (0, common_1.UseGuards)(auth_jwt_guard_1.AuthJwtGuard),
    (0, EitherResolver_1.EitherResolver)(),
    __param(0, (0, graphql_1.Args)('realm', {
        type: () => PublicKey_1.PublicKeyScalar,
        description: 'Public key of the realm the comment belongs in',
    })),
    __param(1, (0, graphql_1.Args)('commentId', {
        type: () => RealmFeedItemCommentID_1.RealmFeedItemCommentIDScalar,
        description: 'The ID of the comment being voted on',
    })),
    __param(2, (0, graphql_1.Args)('vote', {
        type: () => RealmFeedItemCommentVoteType_1.RealmFeedItemCommentVoteType,
        description: 'The type of vote',
    })),
    __param(3, (0, CurrentEnvironment_1.CurrentEnvironment)()),
    __param(4, (0, CurrentUser_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [web3_js_1.PublicKey, Number, String, String, Object]),
    __metadata("design:returntype", void 0)
], RealmFeedItemCommentResolver.prototype, "voteOnFeedItemComment", null);
RealmFeedItemCommentResolver = __decorate([
    (0, graphql_1.Resolver)(() => RealmFeedItemComment_1.RealmFeedItemComment),
    __metadata("design:paramtypes", [realm_feed_item_comment_service_1.RealmFeedItemCommentService])
], RealmFeedItemCommentResolver);
exports.RealmFeedItemCommentResolver = RealmFeedItemCommentResolver;
//# sourceMappingURL=realm-feed-item-comment.resolver.js.map