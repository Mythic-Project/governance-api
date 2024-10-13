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
exports.RealmGovernanceService = void 0;
const common_1 = require("@nestjs/common");
const spl_governance_1 = require("@solana/spl-governance");
const web3_js_1 = require("@solana/web3.js");
const bignumber_js_1 = require("bignumber.js");
const date_fns_1 = require("date-fns");
const ramda_1 = require("ramda");
const errors = require("../lib/errors/gql");
const helius_service_1 = require("../helius/helius.service");
const stale_cache_service_1 = require("../stale-cache/stale-cache.service");
const GovernanceRules_1 = require("./dto/GovernanceRules");
const MAX_NUM = new bignumber_js_1.BigNumber('18446744073709551615');
function voteTippingToGovernanceVoteTipping(voteTipping) {
    switch (voteTipping) {
        case spl_governance_1.VoteTipping.Disabled:
            return GovernanceRules_1.GovernanceVoteTipping.Disabled;
        case spl_governance_1.VoteTipping.Early:
            return GovernanceRules_1.GovernanceVoteTipping.Early;
        case spl_governance_1.VoteTipping.Strict:
            return GovernanceRules_1.GovernanceVoteTipping.Strict;
        case 'DISABLED':
            return GovernanceRules_1.GovernanceVoteTipping.Disabled;
        case 'EARLY':
            return GovernanceRules_1.GovernanceVoteTipping.Early;
        case 'STRICT':
            return GovernanceRules_1.GovernanceVoteTipping.Strict;
        default:
            return GovernanceRules_1.GovernanceVoteTipping.Disabled;
    }
}
let RealmGovernanceService = class RealmGovernanceService {
    constructor(staleCacheService, heliusService) {
        this.staleCacheService = staleCacheService;
        this.heliusService = heliusService;
    }
    async getGovernancesForRealm(realmPublicKey, environment) {
        const [governances, realm] = await Promise.all([
            this.heliusService.getGovernances(realmPublicKey, environment),
            this.heliusService.getRealm(realmPublicKey, environment),
        ]);
        return governances.map((data) => {
            const governance = {
                address: data.pubkey,
                communityMint: realm.account.communityMint,
                councilMint: realm.account.config.councilMint || null,
                communityMintMaxVoteWeight: new bignumber_js_1.BigNumber(realm.account.config.communityMintMaxVoteWeightSource.value.toString()),
                communityMintMaxVoteWeightSource: realm.account.config.communityMintMaxVoteWeightSource.type,
            };
            return governance;
        });
    }
    async getGovernanceRules(programPublicKey, governanceAddress, environment) {
        var _a, _b, _c, _d, _e, _f, _g;
        const [walletAddress, programVersion, governanceAccount] = await Promise.all([
            (0, spl_governance_1.getNativeTreasuryAddress)(programPublicKey, governanceAddress),
            this.heliusService.getProgramVersion(programPublicKey, environment),
            this.heliusService.getGovernance(governanceAddress, environment),
        ]);
        const onChainConfig = governanceAccount.account.config;
        const realmPublicKey = governanceAccount.account.realm;
        const realm = await this.heliusService.getRealm(realmPublicKey, environment);
        const councilMint = (_a = realm.account.config.councilMint) === null || _a === void 0 ? void 0 : _a.toBase58();
        const communityMint = realm.account.communityMint.toBase58();
        if (!communityMint) {
            throw new errors.MalformedData();
        }
        const [councilMintInfo, communityMintInfo] = await Promise.all([
            councilMint
                ? this.heliusService.getTokenMintInfo(new web3_js_1.PublicKey(councilMint), environment)
                : null,
            this.heliusService.getTokenMintInfo(new web3_js_1.PublicKey(communityMint), environment),
        ]);
        const rules = {
            governanceAddress,
            walletAddress,
            coolOffHours: (0, date_fns_1.secondsToHours)(onChainConfig.votingCoolOffTime || 0),
            councilTokenRules: councilMintInfo
                ? {
                    canCreateProposal: new bignumber_js_1.BigNumber(onChainConfig.minCouncilTokensToCreateProposal.toString()).isLessThan(MAX_NUM),
                    canVeto: ((_b = onChainConfig.councilVetoVoteThreshold) === null || _b === void 0 ? void 0 : _b.type) ===
                        spl_governance_1.VoteThresholdType.YesVotePercentage ||
                        ((_c = onChainConfig.councilVetoVoteThreshold) === null || _c === void 0 ? void 0 : _c.type) === spl_governance_1.VoteThresholdType.QuorumPercentage
                        ? true
                        : false,
                    canVote: ((_d = onChainConfig.councilVoteThreshold) === null || _d === void 0 ? void 0 : _d.type) === spl_governance_1.VoteThresholdType.Disabled
                        ? false
                        : true,
                    quorumPercent: onChainConfig.councilVoteThreshold
                        ? onChainConfig.councilVoteThreshold.type === spl_governance_1.VoteThresholdType.Disabled
                            ? 60
                            : onChainConfig.councilVoteThreshold.value || 60
                        : 60,
                    tokenMintAddress: councilMintInfo.publicKey,
                    tokenMintDecimals: new bignumber_js_1.BigNumber(councilMintInfo.account.decimals),
                    tokenType: GovernanceRules_1.GovernanceTokenType.Council,
                    totalSupply: new bignumber_js_1.BigNumber(councilMintInfo.account.supply.toString()).shiftedBy(-councilMintInfo.account.decimals),
                    vetoQuorumPercent: onChainConfig.councilVetoVoteThreshold
                        ? onChainConfig.councilVetoVoteThreshold.type === spl_governance_1.VoteThresholdType.Disabled
                            ? 60
                            : onChainConfig.councilVetoVoteThreshold.value || 60
                        : 60,
                    voteTipping: voteTippingToGovernanceVoteTipping(onChainConfig.councilVoteTipping),
                    votingPowerToCreateProposals: new bignumber_js_1.BigNumber(onChainConfig.minCouncilTokensToCreateProposal.toString()).shiftedBy(-councilMintInfo.account.decimals),
                }
                : null,
            communityTokenRules: {
                canCreateProposal: new bignumber_js_1.BigNumber(onChainConfig.minCommunityTokensToCreateProposal.toString()).isLessThan(MAX_NUM),
                canVeto: ((_e = onChainConfig.communityVetoVoteThreshold) === null || _e === void 0 ? void 0 : _e.type) === spl_governance_1.VoteThresholdType.YesVotePercentage ||
                    ((_f = onChainConfig.communityVetoVoteThreshold) === null || _f === void 0 ? void 0 : _f.type) === spl_governance_1.VoteThresholdType.QuorumPercentage
                    ? true
                    : false,
                canVote: ((_g = onChainConfig.communityVoteThreshold) === null || _g === void 0 ? void 0 : _g.type) === spl_governance_1.VoteThresholdType.Disabled ? false : true,
                quorumPercent: onChainConfig.communityVoteThreshold
                    ? onChainConfig.communityVoteThreshold.type === spl_governance_1.VoteThresholdType.Disabled
                        ? 60
                        : onChainConfig.communityVoteThreshold.value || 60
                    : 60,
                tokenMintAddress: communityMintInfo.publicKey,
                tokenMintDecimals: new bignumber_js_1.BigNumber(communityMintInfo.account.decimals),
                tokenType: GovernanceRules_1.GovernanceTokenType.Community,
                totalSupply: new bignumber_js_1.BigNumber(communityMintInfo.account.supply.toString()).shiftedBy(-communityMintInfo.account.decimals),
                vetoQuorumPercent: onChainConfig.communityVetoVoteThreshold
                    ? onChainConfig.communityVetoVoteThreshold.type === spl_governance_1.VoteThresholdType.Disabled
                        ? 60
                        : onChainConfig.communityVetoVoteThreshold.value || 60
                    : 60,
                voteTipping: voteTippingToGovernanceVoteTipping(onChainConfig.communityVoteTipping),
                votingPowerToCreateProposals: new bignumber_js_1.BigNumber(onChainConfig.minCommunityTokensToCreateProposal.toString()).shiftedBy(-communityMintInfo.account.decimals),
            },
            depositExemptProposalCount: (0, ramda_1.isNil)(onChainConfig['depositExemptProposalCount'])
                ? 10
                : onChainConfig['depositExemptProposalCount'],
            maxVoteDays: (0, date_fns_1.secondsToHours)(onChainConfig.maxVotingTime) / 24,
            minInstructionHoldupDays: (0, date_fns_1.secondsToHours)(onChainConfig.minInstructionHoldUpTime) / 24,
            version: programVersion,
        };
        return rules;
    }
};
RealmGovernanceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [stale_cache_service_1.StaleCacheService,
        helius_service_1.HeliusService])
], RealmGovernanceService);
exports.RealmGovernanceService = RealmGovernanceService;
//# sourceMappingURL=realm-governance.service.js.map