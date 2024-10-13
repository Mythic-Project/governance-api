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
exports.RealmProposalUserVote = exports.RealmProposalUserVoteType = void 0;
const graphql_1 = require("@nestjs/graphql");
const bignumber_js_1 = require("bignumber.js");
const BigNumber_1 = require("../../lib/scalars/BigNumber");
var RealmProposalUserVoteType;
(function (RealmProposalUserVoteType) {
    RealmProposalUserVoteType["Abstain"] = "Abstain";
    RealmProposalUserVoteType["No"] = "No";
    RealmProposalUserVoteType["Veto"] = "Veto";
    RealmProposalUserVoteType["Yes"] = "Yes";
})(RealmProposalUserVoteType = exports.RealmProposalUserVoteType || (exports.RealmProposalUserVoteType = {}));
(0, graphql_1.registerEnumType)(RealmProposalUserVoteType, {
    name: 'RealmProposalUserVoteType',
    description: 'The way the user voted',
});
let RealmProposalUserVote = class RealmProposalUserVote {
};
__decorate([
    (0, graphql_1.Field)(() => RealmProposalUserVoteType, {
        description: 'The way the user voted',
    }),
    __metadata("design:type", String)
], RealmProposalUserVote.prototype, "type", void 0);
__decorate([
    (0, graphql_1.Field)(() => BigNumber_1.BigNumberScalar, {
        description: 'The vote weight used in the vote',
    }),
    __metadata("design:type", bignumber_js_1.default)
], RealmProposalUserVote.prototype, "weight", void 0);
RealmProposalUserVote = __decorate([
    (0, graphql_1.ObjectType)({
        description: 'A user vote on a proposal',
    })
], RealmProposalUserVote);
exports.RealmProposalUserVote = RealmProposalUserVote;
//# sourceMappingURL=RealmProposalUserVote.js.map