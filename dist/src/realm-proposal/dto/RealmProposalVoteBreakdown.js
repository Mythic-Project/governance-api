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
exports.RealmProposalVoteBreakdown = void 0;
const graphql_1 = require("@nestjs/graphql");
const bignumber_js_1 = require("bignumber.js");
const BigNumber_1 = require("../../lib/scalars/BigNumber");
let RealmProposalVoteBreakdown = class RealmProposalVoteBreakdown {
};
__decorate([
    (0, graphql_1.Field)(() => Number, {
        description: 'Percentage of the yes vote threshold that has been met',
        nullable: true,
    }),
    __metadata("design:type", Object)
], RealmProposalVoteBreakdown.prototype, "percentThresholdMet", void 0);
__decorate([
    (0, graphql_1.Field)(() => BigNumber_1.BigNumberScalar, {
        description: 'The minimum number of yes votes required for the proposal to be valid',
        nullable: true,
    }),
    __metadata("design:type", Object)
], RealmProposalVoteBreakdown.prototype, "threshold", void 0);
__decorate([
    (0, graphql_1.Field)(() => BigNumber_1.BigNumberScalar, {
        description: 'The total amount of `No` votes',
    }),
    __metadata("design:type", bignumber_js_1.default)
], RealmProposalVoteBreakdown.prototype, "totalNoWeight", void 0);
__decorate([
    (0, graphql_1.Field)(() => BigNumber_1.BigNumberScalar, {
        description: 'The total amount of `Yes` votes',
    }),
    __metadata("design:type", bignumber_js_1.default)
], RealmProposalVoteBreakdown.prototype, "totalYesWeight", void 0);
__decorate([
    (0, graphql_1.Field)(() => BigNumber_1.BigNumberScalar, {
        description: 'The total possible amount of votes in the realm',
        nullable: true,
    }),
    __metadata("design:type", Object)
], RealmProposalVoteBreakdown.prototype, "totalPossibleWeight", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number, {
        description: 'The approval quorum needed as a percentage',
        nullable: true,
    }),
    __metadata("design:type", Object)
], RealmProposalVoteBreakdown.prototype, "voteThresholdPercentage", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, {
        description: 'When voting on the proposal ends or ended',
        nullable: true,
    }),
    __metadata("design:type", Object)
], RealmProposalVoteBreakdown.prototype, "votingEnd", void 0);
RealmProposalVoteBreakdown = __decorate([
    (0, graphql_1.ObjectType)({
        description: 'The distribution of votes on a proposal',
    })
], RealmProposalVoteBreakdown);
exports.RealmProposalVoteBreakdown = RealmProposalVoteBreakdown;
//# sourceMappingURL=RealmProposalVoteBreakdown.js.map