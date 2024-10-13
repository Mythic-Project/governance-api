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
exports.RealmProposal = void 0;
const graphql_1 = require("@nestjs/graphql");
const web3_js_1 = require("@solana/web3.js");
const PublicKey_1 = require("../../lib/scalars/PublicKey");
const RichTextDocument_1 = require("../../lib/scalars/RichTextDocument");
const RealmMember_1 = require("../../realm-member/dto/RealmMember");
const RealmProposalState_1 = require("./RealmProposalState");
const RealmProposalUserVote_1 = require("./RealmProposalUserVote");
const RealmProposalVoteBreakdown_1 = require("./RealmProposalVoteBreakdown");
let RealmProposal = class RealmProposal {
};
__decorate([
    (0, graphql_1.Field)(() => RealmMember_1.RealmMember, {
        description: 'The creator of the proposal',
        nullable: true,
    }),
    __metadata("design:type", RealmMember_1.RealmMember)
], RealmProposal.prototype, "author", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, {
        description: 'Creation timestamp',
    }),
    __metadata("design:type", Date)
], RealmProposal.prototype, "created", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, {
        description: 'On-chain description for the proposal',
    }),
    __metadata("design:type", String)
], RealmProposal.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)(() => RichTextDocument_1.RichTextDocumentScalar, {
        description: 'Proposal body text',
    }),
    __metadata("design:type", Object)
], RealmProposal.prototype, "document", void 0);
__decorate([
    (0, graphql_1.Field)(() => PublicKey_1.PublicKeyScalar, {
        description: 'Public Key address for the proposal',
    }),
    __metadata("design:type", web3_js_1.PublicKey)
], RealmProposal.prototype, "publicKey", void 0);
__decorate([
    (0, graphql_1.Field)(() => RealmProposalUserVote_1.RealmProposalUserVote, {
        description: "The requesting user's vote",
        nullable: true,
    }),
    __metadata("design:type", Object)
], RealmProposal.prototype, "myVote", void 0);
__decorate([
    (0, graphql_1.Field)(() => RealmProposalState_1.RealmProposalState, {
        description: 'Current state of the proposal',
    }),
    __metadata("design:type", String)
], RealmProposal.prototype, "state", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, {
        description: 'Title for the proposal',
    }),
    __metadata("design:type", String)
], RealmProposal.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, {
        description: 'Update timestamp',
    }),
    __metadata("design:type", Date)
], RealmProposal.prototype, "updated", void 0);
__decorate([
    (0, graphql_1.Field)(() => RealmProposalVoteBreakdown_1.RealmProposalVoteBreakdown, {
        description: 'A breakdown of how users voted on the proposal',
    }),
    __metadata("design:type", RealmProposalVoteBreakdown_1.RealmProposalVoteBreakdown)
], RealmProposal.prototype, "voteBreakdown", void 0);
RealmProposal = __decorate([
    (0, graphql_1.ObjectType)({
        description: 'A proposal in a Realm',
    })
], RealmProposal);
exports.RealmProposal = RealmProposal;
//# sourceMappingURL=RealmProposal.js.map