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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RealmFeedItem = exports.RealmFeedItemProposal = exports.RealmFeedItemPost = void 0;
const graphql_1 = require("@nestjs/graphql");
const web3_js_1 = require("@solana/web3.js");
const PublicKey_1 = require("../../lib/scalars/PublicKey");
const RichTextDocument_1 = require("../../lib/scalars/RichTextDocument");
const RealmFeedItemID_1 = require("../../lib/scalars/RealmFeedItemID");
const RealmMember_1 = require("../../realm-member/dto/RealmMember");
const RealmPost_1 = require("../../realm-post/dto/RealmPost");
const RealmProposal_1 = require("../../realm-proposal/dto/RealmProposal");
const RealmFeedItemType_1 = require("./RealmFeedItemType");
const RealmFeedItemVoteType_1 = require("./RealmFeedItemVoteType");
let RealmFeedItemPost = class RealmFeedItemPost {
};
__decorate([
    (0, graphql_1.Field)(() => RealmFeedItemType_1.RealmFeedItemType, {
        description: 'A discriminant indicating this is a post item',
    }),
    __metadata("design:type", String)
], RealmFeedItemPost.prototype, "type", void 0);
__decorate([
    (0, graphql_1.Field)(() => RealmMember_1.RealmMember, {
        description: 'The creator of the post',
        nullable: true,
    }),
    __metadata("design:type", RealmMember_1.RealmMember)
], RealmFeedItemPost.prototype, "author", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, {
        description: 'When the feed item was created',
    }),
    __metadata("design:type", Date)
], RealmFeedItemPost.prototype, "created", void 0);
__decorate([
    (0, graphql_1.Field)(() => RichTextDocument_1.RichTextDocumentScalar, {
        description: 'Post body text',
    }),
    __metadata("design:type", Object)
], RealmFeedItemPost.prototype, "document", void 0);
__decorate([
    (0, graphql_1.Field)(() => RealmFeedItemID_1.RealmFeedItemIDScalar),
    __metadata("design:type", Number)
], RealmFeedItemPost.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => RealmFeedItemVoteType_1.RealmFeedItemVoteType, {
        description: "The requesting user's vote on the feed item",
        nullable: true,
    }),
    __metadata("design:type", String)
], RealmFeedItemPost.prototype, "myVote", void 0);
__decorate([
    (0, graphql_1.Field)(() => RealmPost_1.RealmPost, {
        description: 'The post',
    }),
    __metadata("design:type", RealmPost_1.RealmPost)
], RealmFeedItemPost.prototype, "post", void 0);
__decorate([
    (0, graphql_1.Field)(() => PublicKey_1.PublicKeyScalar, {
        description: 'Public key of the realm the post is in',
    }),
    __metadata("design:type", web3_js_1.PublicKey)
], RealmFeedItemPost.prototype, "realmPublicKey", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number, {
        description: 'The total raw score for the feed item',
    }),
    __metadata("design:type", Number)
], RealmFeedItemPost.prototype, "score", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, {
        description: 'Title for the post',
    }),
    __metadata("design:type", String)
], RealmFeedItemPost.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, {
        description: 'When the feed item was last updated',
    }),
    __metadata("design:type", Date)
], RealmFeedItemPost.prototype, "updated", void 0);
RealmFeedItemPost = __decorate([
    (0, graphql_1.ObjectType)({
        description: 'A post feed item',
    })
], RealmFeedItemPost);
exports.RealmFeedItemPost = RealmFeedItemPost;
let RealmFeedItemProposal = class RealmFeedItemProposal {
};
__decorate([
    (0, graphql_1.Field)(() => RealmFeedItemType_1.RealmFeedItemType, {
        description: 'A discriminant indicating this is a proposal item',
    }),
    __metadata("design:type", String)
], RealmFeedItemProposal.prototype, "type", void 0);
__decorate([
    (0, graphql_1.Field)(() => RealmMember_1.RealmMember, {
        description: 'The creator of the proposal',
        nullable: true,
    }),
    __metadata("design:type", RealmMember_1.RealmMember)
], RealmFeedItemProposal.prototype, "author", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, {
        description: 'When the feed item was created',
    }),
    __metadata("design:type", Date)
], RealmFeedItemProposal.prototype, "created", void 0);
__decorate([
    (0, graphql_1.Field)(() => RichTextDocument_1.RichTextDocumentScalar, {
        description: 'Proposal body text',
    }),
    __metadata("design:type", Object)
], RealmFeedItemProposal.prototype, "document", void 0);
__decorate([
    (0, graphql_1.Field)(() => RealmFeedItemID_1.RealmFeedItemIDScalar),
    __metadata("design:type", Number)
], RealmFeedItemProposal.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => RealmFeedItemVoteType_1.RealmFeedItemVoteType, {
        description: "The requesting user's vote on the feed item",
        nullable: true,
    }),
    __metadata("design:type", String)
], RealmFeedItemProposal.prototype, "myVote", void 0);
__decorate([
    (0, graphql_1.Field)(() => RealmProposal_1.RealmProposal, {
        description: 'The proposal',
    }),
    __metadata("design:type", RealmProposal_1.RealmProposal)
], RealmFeedItemProposal.prototype, "proposal", void 0);
__decorate([
    (0, graphql_1.Field)(() => PublicKey_1.PublicKeyScalar, {
        description: 'Public key of the realm the proposal is in',
    }),
    __metadata("design:type", web3_js_1.PublicKey)
], RealmFeedItemProposal.prototype, "realmPublicKey", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number, {
        description: 'The total raw score for the feed item',
    }),
    __metadata("design:type", Number)
], RealmFeedItemProposal.prototype, "score", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, {
        description: 'Title for the proposal',
    }),
    __metadata("design:type", String)
], RealmFeedItemProposal.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, {
        description: 'When the feed item was last updated',
    }),
    __metadata("design:type", Date)
], RealmFeedItemProposal.prototype, "updated", void 0);
RealmFeedItemProposal = __decorate([
    (0, graphql_1.ObjectType)({
        description: 'A proposal feed item',
    })
], RealmFeedItemProposal);
exports.RealmFeedItemProposal = RealmFeedItemProposal;
exports.RealmFeedItem = (0, graphql_1.createUnionType)({
    name: 'RealmFeedItem',
    description: "An item in a Realm's feed",
    resolveType: (value) => {
        if (value.type === RealmFeedItemType_1.RealmFeedItemType.Proposal) {
            return RealmFeedItemProposal;
        }
        return RealmFeedItemPost;
    },
    types: () => [RealmFeedItemPost, RealmFeedItemProposal],
});
//# sourceMappingURL=RealmFeedItem.js.map