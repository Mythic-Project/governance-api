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
var RealmFeedItemComment_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RealmFeedItemComment = void 0;
const graphql_1 = require("@nestjs/graphql");
const RichTextDocument_1 = require("../../lib/scalars/RichTextDocument");
const RealmFeedItemCommentID_1 = require("../../lib/scalars/RealmFeedItemCommentID");
const RealmFeedItemID_1 = require("../../lib/scalars/RealmFeedItemID");
const RealmMember_1 = require("../../realm-member/dto/RealmMember");
const RealmFeedItemCommentVoteType_1 = require("./RealmFeedItemCommentVoteType");
let RealmFeedItemComment = RealmFeedItemComment_1 = class RealmFeedItemComment {
};
__decorate([
    (0, graphql_1.Field)(() => RealmMember_1.RealmMember, {
        description: 'The creator of the comment',
        nullable: true,
    }),
    __metadata("design:type", RealmMember_1.RealmMember)
], RealmFeedItemComment.prototype, "author", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, {
        description: 'When the comment was created',
    }),
    __metadata("design:type", Date)
], RealmFeedItemComment.prototype, "created", void 0);
__decorate([
    (0, graphql_1.Field)(() => RichTextDocument_1.RichTextDocumentScalar, {
        description: 'Comment body text',
    }),
    __metadata("design:type", Object)
], RealmFeedItemComment.prototype, "document", void 0);
__decorate([
    (0, graphql_1.Field)(() => RealmFeedItemID_1.RealmFeedItemIDScalar, {
        description: 'ID of the feed item the comment is in',
    }),
    __metadata("design:type", Number)
], RealmFeedItemComment.prototype, "feedItemId", void 0);
__decorate([
    (0, graphql_1.Field)(() => RealmFeedItemCommentID_1.RealmFeedItemCommentIDScalar, {
        description: 'ID of the comment',
    }),
    __metadata("design:type", Number)
], RealmFeedItemComment.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => RealmFeedItemCommentVoteType_1.RealmFeedItemCommentVoteType, {
        description: "The requesting user's vote on the comment",
        nullable: true,
    }),
    __metadata("design:type", String)
], RealmFeedItemComment.prototype, "myVote", void 0);
__decorate([
    (0, graphql_1.Field)(() => RealmFeedItemCommentID_1.RealmFeedItemCommentIDScalar, {
        description: 'ID of the parent comment',
        nullable: true,
    }),
    __metadata("design:type", Object)
], RealmFeedItemComment.prototype, "parentCommentId", void 0);
__decorate([
    (0, graphql_1.Field)(() => [RealmFeedItemComment_1], {
        description: 'Replies to the comment',
        nullable: true,
    }),
    __metadata("design:type", Object)
], RealmFeedItemComment.prototype, "replies", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number, {
        description: 'The number of immediate replies to this comment',
    }),
    __metadata("design:type", Number)
], RealmFeedItemComment.prototype, "repliesCount", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number, {
        description: 'The total raw score for the comment',
    }),
    __metadata("design:type", Number)
], RealmFeedItemComment.prototype, "score", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, {
        description: 'When the comment was last updated',
    }),
    __metadata("design:type", Date)
], RealmFeedItemComment.prototype, "updated", void 0);
RealmFeedItemComment = RealmFeedItemComment_1 = __decorate([
    (0, graphql_1.ObjectType)({
        description: 'A comment on a feed item',
    })
], RealmFeedItemComment);
exports.RealmFeedItemComment = RealmFeedItemComment;
//# sourceMappingURL=RealmFeedItemComment.js.map