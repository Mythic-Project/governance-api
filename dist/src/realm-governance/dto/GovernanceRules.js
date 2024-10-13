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
exports.GovernanceRules = exports.TokenBasedGovernanceRules = exports.GovernanceVoteTipping = exports.GovernanceTokenType = void 0;
const graphql_1 = require("@nestjs/graphql");
const web3_js_1 = require("@solana/web3.js");
const bignumber_js_1 = require("bignumber.js");
const BigNumber_1 = require("../../lib/scalars/BigNumber");
const PublicKey_1 = require("../../lib/scalars/PublicKey");
var GovernanceTokenType;
(function (GovernanceTokenType) {
    GovernanceTokenType["Council"] = "Council";
    GovernanceTokenType["Community"] = "Community";
})(GovernanceTokenType = exports.GovernanceTokenType || (exports.GovernanceTokenType = {}));
var GovernanceVoteTipping;
(function (GovernanceVoteTipping) {
    GovernanceVoteTipping["Disabled"] = "Disabled";
    GovernanceVoteTipping["Early"] = "Early";
    GovernanceVoteTipping["Strict"] = "Strict";
})(GovernanceVoteTipping = exports.GovernanceVoteTipping || (exports.GovernanceVoteTipping = {}));
(0, graphql_1.registerEnumType)(GovernanceTokenType, {
    name: 'GovernanceTokenType',
});
(0, graphql_1.registerEnumType)(GovernanceVoteTipping, {
    name: 'GovernanceVoteTipping',
});
let TokenBasedGovernanceRules = class TokenBasedGovernanceRules {
};
__decorate([
    (0, graphql_1.Field)(() => Boolean, {
        description: 'Can holders of this token type create a proposal',
    }),
    __metadata("design:type", Boolean)
], TokenBasedGovernanceRules.prototype, "canCreateProposal", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean, {
        description: 'Can holders of this token type veto a proposal',
    }),
    __metadata("design:type", Boolean)
], TokenBasedGovernanceRules.prototype, "canVeto", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean, {
        description: 'Can holders of this token type vote',
    }),
    __metadata("design:type", Boolean)
], TokenBasedGovernanceRules.prototype, "canVote", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number, {
        description: 'The % of tokens that must vote Yes for the propsal to be valid',
    }),
    __metadata("design:type", Number)
], TokenBasedGovernanceRules.prototype, "quorumPercent", void 0);
__decorate([
    (0, graphql_1.Field)(() => PublicKey_1.PublicKeyScalar, {
        description: 'Public address of the token mint',
    }),
    __metadata("design:type", web3_js_1.PublicKey)
], TokenBasedGovernanceRules.prototype, "tokenMintAddress", void 0);
__decorate([
    (0, graphql_1.Field)(() => BigNumber_1.BigNumberScalar, {
        description: 'The token mint decimals',
    }),
    __metadata("design:type", bignumber_js_1.BigNumber)
], TokenBasedGovernanceRules.prototype, "tokenMintDecimals", void 0);
__decorate([
    (0, graphql_1.Field)(() => GovernanceTokenType, {
        description: 'Token type the rules apply to',
    }),
    __metadata("design:type", String)
], TokenBasedGovernanceRules.prototype, "tokenType", void 0);
__decorate([
    (0, graphql_1.Field)(() => BigNumber_1.BigNumberScalar, {
        description: 'Total token supply',
    }),
    __metadata("design:type", bignumber_js_1.BigNumber)
], TokenBasedGovernanceRules.prototype, "totalSupply", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number, {
        description: 'The % of tokens that must veto a proposal for it to be vetoed',
    }),
    __metadata("design:type", Number)
], TokenBasedGovernanceRules.prototype, "vetoQuorumPercent", void 0);
__decorate([
    (0, graphql_1.Field)(() => GovernanceVoteTipping, {
        description: 'How vote tipping behaves for this token type',
    }),
    __metadata("design:type", String)
], TokenBasedGovernanceRules.prototype, "voteTipping", void 0);
__decorate([
    (0, graphql_1.Field)(() => BigNumber_1.BigNumberScalar, {
        description: 'Voting power required to create a proposal',
    }),
    __metadata("design:type", bignumber_js_1.BigNumber)
], TokenBasedGovernanceRules.prototype, "votingPowerToCreateProposals", void 0);
TokenBasedGovernanceRules = __decorate([
    (0, graphql_1.ObjectType)({
        description: 'Rules collection based on voter type',
    })
], TokenBasedGovernanceRules);
exports.TokenBasedGovernanceRules = TokenBasedGovernanceRules;
let GovernanceRules = class GovernanceRules {
};
__decorate([
    (0, graphql_1.Field)(() => PublicKey_1.PublicKeyScalar, {
        description: 'Address of the governance',
    }),
    __metadata("design:type", web3_js_1.PublicKey)
], GovernanceRules.prototype, "governanceAddress", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number, {
        description: 'Rules version',
    }),
    __metadata("design:type", Number)
], GovernanceRules.prototype, "version", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number, {
        description: 'Hours in the cool-off period',
    }),
    __metadata("design:type", Number)
], GovernanceRules.prototype, "coolOffHours", void 0);
__decorate([
    (0, graphql_1.Field)(() => TokenBasedGovernanceRules, {
        description: 'Council token rules',
        nullable: true,
    }),
    __metadata("design:type", Object)
], GovernanceRules.prototype, "councilTokenRules", void 0);
__decorate([
    (0, graphql_1.Field)(() => TokenBasedGovernanceRules, {
        description: 'Community token rules',
    }),
    __metadata("design:type", TokenBasedGovernanceRules)
], GovernanceRules.prototype, "communityTokenRules", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, {
        description: 'Number of deposit exempt proposals',
    }),
    __metadata("design:type", Number)
], GovernanceRules.prototype, "depositExemptProposalCount", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number, {
        description: 'Total max number of voting days',
    }),
    __metadata("design:type", Number)
], GovernanceRules.prototype, "maxVoteDays", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number, {
        description: 'Minimum number of days to holdup instruction execution',
    }),
    __metadata("design:type", Number)
], GovernanceRules.prototype, "minInstructionHoldupDays", void 0);
__decorate([
    (0, graphql_1.Field)(() => PublicKey_1.PublicKeyScalar, {
        description: 'The wallet associated with this governance',
    }),
    __metadata("design:type", web3_js_1.PublicKey)
], GovernanceRules.prototype, "walletAddress", void 0);
GovernanceRules = __decorate([
    (0, graphql_1.ObjectType)({
        description: 'Rules for a governance',
    })
], GovernanceRules);
exports.GovernanceRules = GovernanceRules;
//# sourceMappingURL=GovernanceRules.js.map